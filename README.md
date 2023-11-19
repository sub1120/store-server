# Store API

![Express.js](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Firebase Auth](https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black)

## Setup

Below steps will guide you, how to set up your project locally. To get a local copy up and running follow these simple example steps.

1. Install pnpm

```
npm i -g pnpm
```

2. Clone repo locally.

```
git clone https://github.com/sub1120/store-server.git
```

3. Install dependencies

```
pnpm i
```

4. Add .env file with following variables

```
MONGO_URI=
PORT=
GOOGLE_APPLICATION_CREDENTIALS=/path/to/serviceAccountKey.json
```

Please use your own credentials.

5. Run project locally

```
pnpm start:dev
```

## API Documentation

### 1. Create a store

```
POST / store
```

Request body

```json
{
  "name": "Store Name",
  "address": "Store Address",
  "phoneNumber": "1234567890",
  "email": "store@test.com",
  "timing": {
    "monday": {
      "opensAt": { "hours": 9, "minutes": 0, "period": "AM" },
      "closesAt": { "hours": 6, "minutes": 0, "period": "PM" }
    },
    "tuesday": {
      "opensAt": { "hours": 9, "minutes": 0, "period": "AM" },
      "closesAt": { "hours": 6, "minutes": 0, "period": "PM" }
    },
    "wednessday": {
      "opensAt": { "hours": 9, "minutes": 0, "period": "AM" },
      "closesAt": { "hours": 6, "minutes": 0, "period": "PM" }
    },
    "thursday": {
      "opensAt": { "hours": 9, "minutes": 0, "period": "AM" },
      "closesAt": { "hours": 6, "minutes": 0, "period": "PM" }
    },
    "friday": {
      "opensAt": { "hours": 9, "minutes": 0, "period": "AM" },
      "closesAt": { "hours": 6, "minutes": 0, "period": "PM" }
    },
    "saturday": {
      "isClosed": true,
      "opensAt": { "hours": 9, "minutes": 0, "period": "AM" },
      "closesAt": { "hours": 6, "minutes": 0, "period": "PM" }
    },
    "sunday": {
      "isClosed": true,
      "opensAt": { "hours": 9, "minutes": 0, "period": "AM" },
      "closesAt": { "hours": 6, "minutes": 0, "period": "PM" }
    }
  },
  "description": "Lorem ipsum dolor sit amet consectetur. Sed ac scelerisque sed feugiat pellentesque sed. Erat vitae cras eleifend consequat euismod eu lorem quis ut. Id netus vestibulum id habitasse arcu enim nibh. Ornare viverra risus felis amet odio neque amet in nunc. Id netus vestibulum id habitasse arcu enim nibh. Ornare viverra risus felis amet odio neque amet in nunc. Id netus vestibulum id habitasse arcu enim nibh. Ornare viverra risus felis amet odio neque amet in nunc. "
}
```

Response body

```json
{
  "success": true,
  "message": "Store Created Successfully",
  "data": {
    "name": "Store Name",
    "address": "Store Address",
    "phoneNumber": "1234567890",
    "timing": {
      "monday": {
        "isClosed": false,
        "opensAt": {
          "hours": 9,
          "minutes": 0,
          "period": "AM"
        },
        "closesAt": {
          "hours": 6,
          "minutes": 0,
          "period": "PM"
        }
      },
      "tuesday": {
        "isClosed": false,
        "opensAt": {
          "hours": 9,
          "minutes": 0,
          "period": "AM"
        },
        "closesAt": {
          "hours": 6,
          "minutes": 0,
          "period": "PM"
        }
      },
      "wednessday": {
        "isClosed": false,
        "opensAt": {
          "hours": 9,
          "minutes": 0,
          "period": "AM"
        },
        "closesAt": {
          "hours": 6,
          "minutes": 0,
          "period": "PM"
        }
      },
      "thursday": {
        "isClosed": false,
        "opensAt": {
          "hours": 9,
          "minutes": 0,
          "period": "AM"
        },
        "closesAt": {
          "hours": 6,
          "minutes": 0,
          "period": "PM"
        }
      },
      "friday": {
        "isClosed": false,
        "opensAt": {
          "hours": 9,
          "minutes": 0,
          "period": "AM"
        },
        "closesAt": {
          "hours": 6,
          "minutes": 0,
          "period": "PM"
        }
      },
      "saturday": {
        "isClosed": true,
        "opensAt": {
          "hours": 9,
          "minutes": 0,
          "period": "AM"
        },
        "closesAt": {
          "hours": 6,
          "minutes": 0,
          "period": "PM"
        }
      },
      "sunday": {
        "isClosed": true,
        "opensAt": {
          "hours": 9,
          "minutes": 0,
          "period": "AM"
        },
        "closesAt": {
          "hours": 6,
          "minutes": 0,
          "period": "PM"
        }
      }
    },
    "description": "Lorem ipsum dolor sit amet consectetur. Sed ac scelerisque sed feugiat pellentesque sed. Erat vitae cras eleifend consequat euismod eu lorem quis ut. Id netus vestibulum id habitasse arcu enim nibh. Ornare viverra risus felis amet odio neque amet in nunc. Id netus vestibulum id habitasse arcu enim nibh. Ornare viverra risus felis amet odio neque amet in nunc. Id netus vestibulum id habitasse arcu enim nibh. Ornare viverra risus felis amet odio neque amet in nunc. ",
    "_id": "655a7929d4eca6c9f6d4f982",
    "__v": 0
  }
}
```

### 2. Get all stores

```
GET /store
```

Response body

```json
{
    "success": true,
    "message": "Stores Feched Successfully",
    "data": [
        {
            "_id": "6558eda38d037cd1f06b226e",
            "name": "Store 1",
            "address": "Address 1",
            "phoneNumber": "12345678908",
            "timing": {
                "monday": {
                    "opensAt": {
                        "hours": 12,
                        "minutes": 0,
                        "period": "PM"
                    },
                    "closesAt": {
                        "hours": 9,
                        "minutes": 0,
                        "period": "PM"
                    },
                    "isClosed": false,
                    "_id": "6558eda38d037cd1f06b2270"
                },
                "tuesday": {
                    "opensAt": {
                        "hours": 12,
                        "minutes": 0,
                        "period": "PM"
                    },
                    "closesAt": {
                        "hours": 9,
                        "minutes": 0,
                        "period": "PM"
                    },
                    "isClosed": false,
                    "_id": "6558eda38d037cd1f06b2271"
                },
                "wednessday": {
                    "opensAt": {
                        "hours": 12,
                        "minutes": 0,
                        "period": "PM"
                    },
                    "closesAt": {
                        "hours": 9,
                        "minutes": 0,
                        "period": "PM"
                    },
                    "isClosed": false,
                    "_id": "6558eda38d037cd1f06b2272"
                },
                "thursday": {
                    "opensAt": {
                        "hours": 12,
                        "minutes": 0,
                        "period": "PM"
                    },
                    "closesAt": {
                        "hours": 9,
                        "minutes": 0,
                        "period": "PM"
                    },
                    "isClosed": false,
                    "_id": "6558eda38d037cd1f06b2273"
                },
                "friday": {
                    "opensAt": {
                        "hours": 12,
                        "minutes": 0,
                        "period": "PM"
                    },
                    "closesAt": {
                        "hours": 9,
                        "minutes": 0,
                        "period": "PM"
                    },
                    "isClosed": false,
                    "_id": "6558eda38d037cd1f06b2274"
                },
                "saturday": {
                    "opensAt": {
                        "hours": 12,
                        "minutes": 0,
                        "period": "PM"
                    },
                    "closesAt": {
                        "hours": 9,
                        "minutes": 0,
                        "period": "PM"
                    },
                    "isClosed": false,
                    "_id": "6558eda38d037cd1f06b2275"
                },
                "sunday": {
                    "opensAt": {
                        "hours": 12,
                        "minutes": 0,
                        "period": "PM"
                    },
                    "closesAt": {
                        "hours": 9,
                        "minutes": 0,
                        "period": "PM"
                    },
                    "isClosed": false,
                    "_id": "6558eda38d037cd1f06b2276"
                },
                "_id": "6558eda38d037cd1f06b226f"
            },
            "description": "Lorem ipsum dolor sit amet consectetur. Sed ac scelerisque sed feugiat pellentesque sed. Erat vitae cras eleifend consequat euismod eu lorem quis ut. Id netus vestibulum id habitasse arcu enim nibh. Ornare viverra risus felis amet odio neque amet in nunc. Id netus vestibulum id habitasse arcu enim nibh. Ornare viverra risus felis amet odio neque amet in nunc. Id netus vestibulum id habitasse arcu enim nibh. Ornare viverra risus felis amet odio neque amet in nunc.",
            "storeStatus": "Closed - Opens 12 PM"
        },

        // other stores
    ]
```

### 3. Get Store By Id

```
GET /store/:id
```

Reponse body

```json
{
  "success": true,
  "message": "Store Feched Successfully",
  "data": {
    "_id": "655a484aa8c5a19d4a941639",
    "name": "Store test",
    "address": "Address 1",
    "phoneNumber": "1234567890",
    "timing": {
      "monday": {
        "opensAt": {
          "hours": 12,
          "minutes": 0,
          "period": "PM"
        },
        "closesAt": {
          "hours": 9,
          "minutes": 0,
          "period": "PM"
        },
        "isClosed": true
      },
      "tuesday": {
        "opensAt": {
          "hours": 12,
          "minutes": 0,
          "period": "PM"
        },
        "closesAt": {
          "hours": 9,
          "minutes": 0,
          "period": "PM"
        },
        "isClosed": false
      },
      "wednessday": {
        "opensAt": {
          "hours": 12,
          "minutes": 0,
          "period": "PM"
        },
        "closesAt": {
          "hours": 9,
          "minutes": 0,
          "period": "PM"
        },
        "isClosed": false
      },
      "thursday": {
        "opensAt": {
          "hours": 12,
          "minutes": 0,
          "period": "PM"
        },
        "closesAt": {
          "hours": 9,
          "minutes": 0,
          "period": "PM"
        },
        "isClosed": false
      },
      "friday": {
        "opensAt": {
          "hours": 12,
          "minutes": 0,
          "period": "PM"
        },
        "closesAt": {
          "hours": 9,
          "minutes": 0,
          "period": "PM"
        },
        "isClosed": false
      },
      "saturday": {
        "opensAt": {
          "hours": 12,
          "minutes": 0,
          "period": "PM"
        },
        "closesAt": {
          "hours": 9,
          "minutes": 0,
          "period": "PM"
        },
        "isClosed": false
      },
      "sunday": {
        "opensAt": {
          "hours": 12,
          "minutes": 0,
          "period": "AM"
        },
        "closesAt": {
          "hours": 9,
          "minutes": 0,
          "period": "PM"
        },
        "isClosed": false
      }
    },
    "description": "Lorem ipsum dolor sit amet consectetur. Sed ac scelerisque sed feugiat pellentesque sed. Erat vitae cras eleifend consequat euismod eu lorem quis ut. Id netus vestibulum id habitasse arcu enim nibh. Ornare viverra risus felis amet odio neque amet in nunc. Id netus vestibulum id habitasse arcu enim nibh. Ornare viverra risus felis amet odio neque amet in nunc. Id netus vestibulum id habitasse arcu enim nibh. Ornare viverra risus felis amet odio neque amet in nunc. ",
    "storeStatus": "Closed - Opens  12 PM"
  }
}
```
