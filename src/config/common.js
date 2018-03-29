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
        "TOKEN_EXPIRE_TIME": 3600000
    },
    "router": {
        "AUTH": "/auth",
    }
};

export {config as vars};

