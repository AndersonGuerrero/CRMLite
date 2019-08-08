import uuidv1 from  'uuid/v1';

export const generateKey = () => {
  return `crm_lite_${ uuidv1() }`;
 }