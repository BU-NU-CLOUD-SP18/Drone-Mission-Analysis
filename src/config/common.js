import {localVars} from "./local";
import {prodVars} from "./prod";

const envVars = process.env.NODE_ENV === "DEV" ? localVars : prodVars;

const config = {
    "path": {
        "API_HEALTH_CHECK": "/healthCheck",
        "auth": {
            "LOGIN": "/login",
            "LOGOUT": "/logout",
            "USER": "/user",
            "IS_LOGGED_IN": "/isLoggedIn"
        },
        "plan": {
            "GET_ALL_PLANS_BY_USER": "/user/:userID/plan"
        },
        "mission": {
            "VALIDATE_MISSION": "/user/:userID/mission"
        },
        "maps": {
            "INITIALIZE_MAPS": "/user/:userID/maps"
        }
    },
    "server": {
        "ENV": process.env.NODE_ENV,
        "PORT": process.env.DMA_APP_SERVER_PORT,
        "ROOT_PATH": "/",
        "PROTOCOL": "http://"
    },
    "cookie": {
        "SECRET": process.env.DMA_APP_SECRET,
        "MAX_AGE": eval(process.env.DMA_COOKIE_MAX_AGE)
    },
    "cognito": {
        "REGION": "us-east-1",
        "POOL_ID": "us-east-1_93Nzmlf4k",
        "CLIENT_ID": "baps0i51gretrhpu8vdif6d1l",
        "TOKEN_TO_USE": "access",   //Possible Values: access | id
        "TOKEN_EXPIRE_TIME": 3600000,
        "IDENTITY_POOL_ID": "us-east-1:18f3fa03-6321-41c8-b741-e26cb1e2debf",
        "IDENTITY_PROVIDER": "cognito-idp.us-east-1.amazonaws.com/us-east-1_93Nzmlf4k"
    },
    "router": {
        "AUTH": "/auth",
    },
    "mission": {
        "error_margin": {
            "POSITION": 0.05,  //RADIANS
            "ALTITUDE": 10, //METRES
            "HEADING": 10,  //DEGREE
            "GIMBAL_PITCH": 10  //DEGREE
        }
    }

};

export {config as vars};