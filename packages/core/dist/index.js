// src/index.js
function getFieldsByFormName(formName) {
  try {
    const forms = JSON.parse(document.querySelector("#djazz-script").textContent);
    return forms[formName];
  } catch (e) {
    return {};
  }
}
function filterFields(fieldsObject, filterFunction) {
  return Object.keys(fieldsObject).reduce((acc, curr) => {
    if (filterFunction(fieldsObject[curr])) {
      acc[curr] = fieldsObject[curr];
    }
    return acc;
  }, {});
}
export {
  filterFields,
  getFieldsByFormName
};
