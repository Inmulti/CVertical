# CVertical
CVertical uzduotis

// API is deployed here https://wxosq8okvd.execute-api.us-east-1.amazonaws.com/dev/

/*
      BUYERS
*/

// GET /buyers should return list of buyers

// GET /buyers/:buyerId returns buyer by id

// POST /buyers expects name and surname strings, creates a new buyer

// PATCH /buyers/:buyerId  updates buyer

// DELETE /buyers/:buyerId deletes buyer

/*
      MODELS
*/

// GET /models should return list of models

// GET /models/:modelId returns model by id

// POST /models expects model and make strings, creates a new model

// PATCH /models/:modelId  updates model

// DELETE /models/:modelId deletes model

/*
      Cars
*/

// GET /cars should return list of cars

// GET /cars/:carId return car by id

// POST /cars expects VIN string, model Id of model object, year a number,  creates a new car

// PATCH /cars/:carId  updates car

// DELETE /casr/:carId deletes car

/*
      Purchases
*/

// GET /purchase should return list of purchases

// GET /purchase/:purchaseId return purchase by id

// POST /purchase expects Car object Id, Buyer object id, Price number, creates a new purchase

// PATCH /purchase/:purchaseId  updates purchase

// DELETE /purchase/:purchaseId deletes purchase
