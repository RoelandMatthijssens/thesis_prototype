package org.mobicrant.iserver;

import com.sun.jersey.api.container.grizzly2.GrizzlyServerFactory;
import com.sun.jersey.api.core.PackagesResourceConfig;
import com.sun.jersey.api.core.ResourceConfig;
import org.glassfish.grizzly.http.server.HttpServer;
import org.mobicrant.iserver.db.DatabaseManager;
import org.mobicrant.iserver.db.DatabaseManager.DbSource;

 import javax.ws.rs.core.UriBuilder;
 import java.io.IOException;
 import java.net.URI;
 
 public class RESTfulServerMain {
 
     private static URI getBaseURI() {
         return UriBuilder.fromUri("http://localhost/").port(9998).build();
         }
 
     public static final URI BASE_URI = getBaseURI();
     private static DatabaseManager db = null;
     
     protected static HttpServer startServer() throws IOException {
         System.out.println("Starting grizzly...");
         ResourceConfig rc = new PackagesResourceConfig("org.mobicrant.iserver.jersey");
         return GrizzlyServerFactory.createHttpServer(BASE_URI, rc);
     }
     
     public static void main(String[] args) throws IOException {
    	 
    	 db = DatabaseManager.getDatabaseManager(DbSource.Jdo);
 		 //db.resetDb();
    	 HttpServer httpServer = startServer();
         
         System.in.read();
         db.closeDb();
         httpServer.stop();
     }    
 }