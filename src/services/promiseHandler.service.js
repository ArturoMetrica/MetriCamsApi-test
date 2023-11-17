module.exports = async (promise) => {
  try {
    const result = await promise;
    return [result, null];
  } catch (error) {
    return [null, error];
  }
};


/********************* Propiedad de Métrica Móvil SA de CV **************************/