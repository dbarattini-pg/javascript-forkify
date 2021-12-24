export default class FetchError extends Error {
  status;
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}
