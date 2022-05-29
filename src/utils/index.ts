/**
 * 深拷贝
 * @param obj 拷贝对象
 * @returns 新的深拷贝对象
 */
export function cloneDeep(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}
