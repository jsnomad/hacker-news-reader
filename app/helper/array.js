/**
 * Sorts the elements
 * @param {number} order a
 * @param {number} order b
 * @return {number}
 */
exports.sortByOrder = (a, b) => {
  if (a.order > b.order) {
    return 1;
  }
  if (a.order < b.order) {
    return -1;
  }
  return 0;
}
