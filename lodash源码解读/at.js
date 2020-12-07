/**
 * Creates an array of values corresponding to `paths` of `object`.
 *
 * @since 1.0.0
 * @category Object
 * @param {Object} object 可iterate的对象.
 * @param {...(string|string[])} [paths] The property paths to pick.
 * @returns {Array} Returns the picked values.
 * @example
 *
 * const object = { 'a': [{ 'b': { 'c': 3 } }, 4] }
 *
 * at(object, ['a[0].b.c', 'a[1]'])
 * // => [3, 4]
 */

 const at = (object, ...paths) => baseAt(object, baseFlatten(paths, 1));

 function baseAt(object, paths) {
   let index = -1;
   const length = paths.length
   const result = new Array(length)
   const skip = object == null;

   while (++index < length) {
     result[index] = skip ? undefined : get(object, paths[index])
   }
   return result;
 }