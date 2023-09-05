export const updateObjectInArray = (items: any[], id: number, objPropName: any, newObjProps: any) => {
    return items.map(user => user[objPropName] === id ? {...user, ...newObjProps} : user)
}