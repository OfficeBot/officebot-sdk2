# OfficeBot SDK

## Creating an SDK Instance
```
const officebotSdk = require('officebot-sdk');

let api = new officebotSdk.API();
api.baseUrl('http://localhost/api');
```

## Creating Endpoints

```
api
  .endpoint(/*A human readable name for the endpoint*/)
  .url(/*relative path to the endpoint*/);
```

For example:

```
api
  .enpoint('AccountManagers')
  .url('/people/account-managers');
```

## Interacting With Endpoints

### Using .find()

```
api.AccountManagers
  .find({some : "query object"})
  .exec()
  .then(accountManagers => {
    //accountManagers will now have an array of Model instances
  });
```

Internally, this will generate the following api call (except with properly escaped query parameters):
```
GET http://localhost/api/people/account-managers?search={some:"query object"}
```

### Using .findById()

```
api.AccountManagers
  .findById(123456)
  .exec()
  .then(accountManager => {
    //accountManager will have a single Model instance
  });
```

Internally, this will generate the following api call:
```
GET http://localhost/api/people/account-managers/123456
```

### Using .findByIdAndUpdate()

```
api.AccountManagers
  .findByIdAndUpdate(123456, { salary : '100k' })
  .exec()
  .then(accountManager => {
    //accountManager will contain an updated instance of Model
  }); 
```

Internally, this will generate the following api call:
```
PUT http://localhost/api/people/account-managers/123456
Request Payload {
  salary : '100k'
}
```

### Using .findByIdAndRemove()

```
api.AccountManagers
  .findByIdAndRemove(123456)
  .exec()
  .then(accountManager => {
    //accountManager will be an empty Model instance
  });
```

Internally, this will generate the following api call:
```
DELETE http://localhost/api/people/account-managers/123456
```

## Models

### Creating a Model Instance

```
let newManager = api.AccountManagers({name : 'Scott', salary : '80k'});
  
```

NOTE: This will not send any data to the server. To do that, you will need to call .save() or .update() on the model.

### Saving and Updating

The sdk library provides two ways of persisting changes back to the server: .save() and .update(). While both accomplish the same thing, 
they each do so in a slightly different way.

### Using .save()

```
newManager.save().then(() => {
  //newManager saved
});
```

If the model has not yet been saved to the server, it will issue the following API call:
```
POST http://localhost/api/people/account-managers
Request Payload {
  //Whatever data is in newManager
}
```

If the model has been saved then it will use the following call instead:
```
PUT http://localhost/api/people/account-managers/{{newManager.id}}
Request Payload {
  //Whatever data is in newManager
}
```

### Using .update()

Like save, .update() sends information to the server to be persisted; however, this method will 
send an array of JSON patches - [RFC 6902](https://tools.ietf.org/html/rfc6902);
```
newManager.update().then(() => {
  //newManager updated
});
```

It is important to know that calling .update() on a model that does not have an .id will likely result 
in undesirable behaviour.

Which will make the following API call:
```
PATCH http://localhost/api/people/account-managers/{{newManager.id}}}
Request Payload {
  //An array of JSON patches
}
```

### Removing a Model

```
newManager.remove().then(() => {
  //The newManager object has been removed
});
```

This will make the following API call:
```
DELETE http://localhost/api/people/account-managers/{{newManager.id}}
```

### Some Important Information About Models

Models use a .id property to generate a url back to the server. If you are having issues getting your models 
to contact the correct endpoints please ensure that you are setting a valid .id .

## Custom Models 

The built-in model constructor is pretty basic, and in most cases it would be a good idea to extend that functionality 
to fit your use-case. To do that, first create a new class that extends the base model and add your custom logic:

```
class CustomModel extends officebotSdk.Model {
  constructor(initialData = {}) {
    super(initialData);
  }

  someCustomMethod() {
    return "Custom method called!"
  }
}
```

Then set that model as the default for your endpoint:

```
api
  .endpoint("CustomEndpoint")
  .route('/custom-endpoint)
  .model(CustomModel);
```

Now any model that is fetched from api.CustomEndpoint will have .someCustomMethod()