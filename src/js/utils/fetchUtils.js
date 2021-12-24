import FetchError from '../errors/FetchError';
import TimeoutError from '../errors/TimeoutError';

const TIMEOUT = process.env.TIMEOUT_MS;

const timeout = function (ms) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(
        new TimeoutError(
          `Request took too long! Timeout after ${(ms / 1000).toFixed(
            1
          )} second`
        )
      );
    }, ms);
  });
};

/**
 * fetch url and return the json data contained inside the Response. Throws an error if the response status is not ok
 * @param  {String} url - url to fetch
 * @param  {String} errorMsg - error message used to build the Error thrown if the response status is not ok. If not specified the response message is used instead
 *
 * @returns {Promise<JSON>} promise that resolves into json data
 */
export async function fetchJson(url, errorMsg = undefined) {
  const response = await Promise.race([fetch(url), timeout(TIMEOUT)]);
  const data = await response.json();

  if (!response.ok) {
    throw new FetchError(
      `${errorMsg ?? data.message} (${response.status})`,
      response.status
    );
  }
  return data;
}

export async function sendJson(url, payload, errorMsg = undefined) {
  const response = await Promise.race([
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }),
    timeout(TIMEOUT),
  ]);
  const data = await response.json();

  if (!response.ok) {
    throw new FetchError(
      `${errorMsg ?? data.message} (${response.status})`,
      response.status
    );
  }
  return data;
}
