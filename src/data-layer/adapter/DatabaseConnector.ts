import { createConnection } from 'typeorm';

export class DatabaseConnector {
    constructor() {
        DatabaseConnector.connect();
    }

    /**
     * Creates a connection to the database and closes connection
     * on app exit
     */
    public static async connect() {
        return await createConnection();
    }
}
