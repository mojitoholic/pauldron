import * as express from "express";
import * as logger from "morgan";
import * as bodyParser from "body-parser";
import {PermissionEndpoint} from "./routes/PermissionEndpoint";
import {AuthorizationEndpoint} from "./routes/AuthorizationEndpoint";
import {IntrospectionEndpoint} from "./routes/IntrospectionEndpoint";
import { PolicyEndpoint } from "./routes/PolicyEndpoint";

export const permissionEndpointURI: string = "/protection/permissions";
export const introspectionEndpointURI: string = "/protection/introspection";
export const authorizationEndpointURI: string = "/authorization";
export const policyEndpointURI: string = "/policies";

// Creates and configures an ExpressJS web server.
export class App {

    // ref to Express instance
    public express: express.Application;

    // Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.express.locals.policies = {};
        this.middleware();
        this.routes();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(logger("dev"));
        this.express.use(bodyParser.json({type: "application/json"}));
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    // Configure API endpoints.
    private routes(): void {
        const permissionEndpoint = new PermissionEndpoint();
        const introspectionEndpoint = new IntrospectionEndpoint();
        const authorizationEndpoint = new AuthorizationEndpoint();
        const policyEndpoint = new PolicyEndpoint();

        const router = express.Router();
        router.get("/", (req, res) => {
          res.json({
            path: "root"
          });
        });
        this.express.use("/", router);
        this.express.use(permissionEndpointURI, permissionEndpoint.router);
        this.express.use(introspectionEndpointURI, introspectionEndpoint.router);
        this.express.use(authorizationEndpointURI, authorizationEndpoint.router);
        this.express.use(policyEndpointURI, policyEndpoint.router);
    }
}