package org.mobicrant.iserver.jersey;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.activation.MimeType;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONException;
import org.mobicrant.iserver.IExtendedServer;
import org.mobicrant.iserver.IServer;
import org.mobicrant.iserver.db.DatabaseManager;
import org.mobicrant.iserver.db.DatabaseManager.DbSource;
import org.mobicrant.iserver.event.*;
import org.mobicrant.iserver.rsl.*;
import org.mobicrant.iserver.event.EntityListener;
import org.mobicrant.iserver.event.IServerListener;
import org.mobicrant.iserver.event.LayerListener;
import org.mobicrant.iserver.event.LinkListener;
import org.mobicrant.iserver.event.PreferenceListener;
import org.mobicrant.iserver.event.ResourceListener;
import org.mobicrant.iserver.event.SelectorListener;
import org.mobicrant.iserver.event.UserListener;

import com.sun.jersey.api.NotFoundException;


@Path("/iserver")
public class IServerJersey {


	   /*
	    * NOT YET IMPLEMENTED
	    * - public static Collection<AbstractRslElement> collectionContainers() 	//no idea what it does
	    * - public static Collection<AbstractRslElement> collectionEntityTypes() 	//never used
	    * 
	    * - public static Collection<AbstractRslElement> collectionImages() 		//not pure RSL
	    * - public static Collection<AbstractRslElement> collectionMovies()			//    ''
	    * - public static Collection<AbstractRslElement> collectionTemplates()		//    ''
	    * - public static Collection<AbstractRslElement> collectionTexts()			//    ''
	    * - public static Collection<AbstractRslElement> collectionWebpages()		//    ''
	    */

	public final static Logger logger = Logger.getLogger(IServerJersey.class.getName());
		
	   private static HashSet<IServerListener> listeners = new HashSet<IServerListener>();

	   private static HashSet<EntityListener> entityListeners = new HashSet<EntityListener>();

	   private static HashSet<UserListener> userListeners = new HashSet<UserListener>();

	   private static HashSet<LayerListener> layerListeners = new HashSet<LayerListener>();

	   private static HashSet<LinkListener> linkListeners = new HashSet<LinkListener>();

	   private static HashSet<PreferenceListener> preferenceListeners = new HashSet<PreferenceListener>();

	   private static HashSet<ResourceListener> resourceListeners = new HashSet<ResourceListener>();

	   private static HashSet<SelectorListener> selectorListeners = new HashSet<SelectorListener>();
	   
	
	   
       @GET 
       @Produces("text/plain") 
       public String getDefaultMessage() {
           return "IServer REST interface";
       }
	
	   public static Collection<AbstractRslElement> collectionActiveLayers() {
	      return DatabaseManager.getCurrentDatabaseManager().read(Layer.class, "isActive == true").getResults();
	   } // collectionActiveLayer
	
	   
	   @GET
	   @Produces(MediaType.APPLICATION_JSON)
	   @Path("/entities")
	   public static String collectionEntities() {
		   Collection<AbstractRslElement> entities = IServer.collectionEntities();
		   JSONObject returnObject = new JSONObject();
		   try{
		   for(AbstractRslElement i : entities){
			   returnObject.append(i.getName(), new JSONObject(i));
		   }
		   }
		   catch(JSONException e){
			   logger.log(Level.WARNING, "Problem when creating JSON result", e); 
		   }
		   logger.info("IServerJersey - collectionEntities() -> "+entities.size()+" results");
		   String returnValue = returnObject.toString();
		   DatabaseManager.getCurrentDatabaseManager().commit();
		   return returnValue;
		   } // collectionEntities

	   @GET
	   @Produces(MediaType.APPLICATION_JSON)
	   @Path("/groups")
	   public static String collectionGroups() {
		   Collection<AbstractRslElement> groups = IServer.collectionGroups();
		   JSONObject returnObject = new JSONObject();
		   try{
		   for(AbstractRslElement i : groups){
			   returnObject.append(i.getName(), new JSONObject(i));
		   }
		   }
		   catch(JSONException e){
			   logger.log(Level.WARNING, "Problem when creating JSON result", e); 
		   }
		   logger.info("IServerJersey - collectionGroups() -> "+groups.size()+" results");
		   String returnValue = returnObject.toString();
		   DatabaseManager.getCurrentDatabaseManager().commit();
		   return returnValue;
	   } // collectionActiveLayer

	
	   
	  
	    
	   
	   
	   @GET
	   @Produces(MediaType.APPLICATION_JSON)
	   @Path("/individuals")
	   public static String collectionIndividuals() {
		   Collection<AbstractRslElement> individuals = IServer.collectionIndividuals();
		   JSONObject returnObject = new JSONObject();
		   try{
		   for(AbstractRslElement i : individuals){
			   returnObject.append(i.getName(), new JSONObject(i));
		   }
		   }
		   catch(JSONException e){
			   logger.log(Level.WARNING, "Problem when creating JSON result", e); 
		   }
		   logger.info("IServerJersey - collectionIndividuals() -> "+individuals.size()+" results");
		   String returnValue = returnObject.toString();
		   DatabaseManager.getCurrentDatabaseManager().commit();
		   return returnValue;
	   } // collectionIndividuals


	   public static Collection<AbstractRslElement> collectionLayers() {
		   return DatabaseManager.getCurrentDatabaseManager().read(Layer.class, "").getResults();
	   } // collectionLayers


		   @GET
		   @Produces(MediaType.APPLICATION_JSON)
		   @Path("/links")
		   public static String collectionLinks() {
			   Collection<AbstractRslElement> links = IServer.collectionLinks();
			   JSONObject returnObject = new JSONObject();
			   try{
			   for(AbstractRslElement i : links){
				   returnObject.append(i.getName(), new JSONObject(i));
			   }
			   }
			   catch(JSONException e){
				   logger.log(Level.WARNING, "Problem when creating JSON result", e); 
			   }
			   logger.info("IServerJersey - collectionLinks() -> "+links.size()+" results");
			   String returnValue = returnObject.toString();
			   DatabaseManager.getCurrentDatabaseManager().commit();
			   return returnValue;
	   } // collectionLinks


	   public static Collection<AbstractRslElement> collectionMedia() {
		   return DatabaseManager.getCurrentDatabaseManager().read(Medium.class, "").getResults();
	   } // collectionMedia


	   public static Collection<AbstractRslElement> collectionPreferences() {
		   return DatabaseManager.getCurrentDatabaseManager().read(Parameter.class, "").getResults();
	   } // collectionPreferences


	   @GET
	   @Produces(MediaType.APPLICATION_JSON)
	   @Path("/resources/raw")
	    public static String collectionResources() {
			   Collection<AbstractRslElement> resources = IServer.collectionResources();
			   JSONObject returnObject = new JSONObject();
			   try{
			   for(AbstractRslElement i : resources){
				   returnObject.append(i.getName(), new JSONObject(i));
			   }
			   }
			   catch(JSONException e){
				   logger.log(Level.WARNING, "Problem when creating JSON result", e); 
			   }
			   logger.info("IServerJersey - collectionResources() -> "+resources.size()+" results");
			   String returnValue = returnObject.toString();
			   DatabaseManager.getCurrentDatabaseManager().commit();
			   return returnValue;
	   } // collectionResources
	   
	   
	   @GET
	   @Produces(MediaType.APPLICATION_JSON)
	   @Path("/resources/text")
	    public static String collectionTextComp() {
			   Collection<AbstractRslElement> resources = IExtendedServer.collectionTextComp();
			   JSONObject returnObject = new JSONObject();
			   try{
			   for(AbstractRslElement i : resources){
				   returnObject.append(i.getName(), new JSONObject(i));
			   }
			   }
			   catch(JSONException e){
				   logger.log(Level.WARNING, "Problem when creating JSON result", e); 
			   }
			   logger.info("IServerJersey - collectionTextComp() -> "+resources.size()+" results");
			   String returnValue = returnObject.toString();
			   DatabaseManager.getCurrentDatabaseManager().commit();
			   return returnValue;
	   } // collectionResources


	   public static Collection<AbstractRslElement> collectionSelectors() {
		   return DatabaseManager.getCurrentDatabaseManager().read(Selector.class, "").getResults();
	   } // collectionSelectors

	   
	   @GET
	   @Produces(MediaType.APPLICATION_JSON)
	   @Path("/users")
	   public static String collectionUsers() {
		   Collection<AbstractRslElement> users = IServer.collectionUsers();
		   JSONObject returnObject = new JSONObject();
		   try{
		   for(AbstractRslElement i : users){
			   returnObject.append(i.getName(), new JSONObject(i));
		   }
		   }
		   catch(JSONException e){
			   logger.log(Level.WARNING, "Problem when creating JSON result", e); 
		   }
		   logger.info("IServerJersey - collectionUsers() -> "+users.size()+" results");
		   String returnValue = returnObject.toString();
		   DatabaseManager.getCurrentDatabaseManager().commit();
		   return returnValue;
	   } // collectionUsers

	   
	   /**
	    * Adds the specified resource to the collections 'Resources' and 'Entities'.
	    * @param resource the resource to be added to the collections.
	    */
	   public static void addToResources(Resource resource) {
		   DatabaseManager.getCurrentDatabaseManager().create(resource);
	   } // addToResources


	   /**
	    * Adds the specified selector to the collections 'Selectors' and 'Entities'.
	    * @param selector the selector to be added to the collections.
	    */
	   public static void addToSelectors(Selector selector) {
		   DatabaseManager.getCurrentDatabaseManager().create(selector);
	   } // addToSelectors


	   /**
	    * Returns the user with the specified name.
	    * @param name the name of the user that has to be returned.
	    * @return the user with the specified name.
	    */
	   @GET
	   @Produces(MediaType.APPLICATION_JSON)
	   @Path("/users/{username}")
	   public static String getUser(@PathParam("username") String name) {
		   User usr =  IServer.getUser(name);
		   logger.info("IServerJersey - getUser("+name+") -> "+usr);
		   DatabaseManager.getCurrentDatabaseManager().commit();
		   if(usr == null){
			   return new JSONObject().toString();
		   }else{
			   return (new JSONObject(usr).toString());
		   }
	   } // getUser

	   //***********************
	   
	  
	   /**
	    *  Add Preferenc to the user
	    */
	   
	   @PUT
	   @Consumes(MediaType.APPLICATION_JSON)
	   @Produces(MediaType.APPLICATION_JSON)
	   @Path("/users/{username}")
	   public static String addPreferenceToUser(@PathParam("username") String name,String json_params )
	   {
		User usr = IServer.getUser(name);
		String key=null;
		String value=null;
		 JSONObject params = null;
			try {
				params = new JSONObject(json_params);
				key = params.getString("key");
				value = params.getString("value");
				} catch (JSONException e) {
				logger.log(Level.WARNING, "Problem when creating JSON result", e);
				DatabaseManager.getCurrentDatabaseManager().commit();
				throw new NotFoundException("Could not create '"+name+"' (maybe a missing/malformed parameter?) Exception raised: "+e.getMessage());
			}  
			usr.addPreference(key, value);
		    String returnValue = new JSONObject(IServer.getUser(name)).toString();
		    logger.info("IServerJersey - UpdateUser ("+ usr + "Add Preference : key :"+key +" value:"+value);
		   
		    DatabaseManager.getCurrentDatabaseManager().commit();
		    return returnValue;
		
	   }
	  	   /**
	  	    * 
	  	    * ADDuSERTOGROUP
	    *  * @param name
	    * @param json_params
	    * @return
	    * */
	   
	  
	   @PUT
	   @Consumes(MediaType.APPLICATION_JSON)
	   @Produces(MediaType.APPLICATION_JSON)
	   @Path("/groups/adduser/{groupname}")
	   public static String addUserToGroup(@PathParam("groupname") String name,String json_params )
	   {
		 String usr= null;
		 JSONObject params = null;
			try {
				params = new JSONObject(json_params);
				usr = params.getString("user");
				} catch (JSONException e) {
				logger.log(Level.WARNING, "Problem when creating JSON result", e);
				DatabaseManager.getCurrentDatabaseManager().commit();
				throw new NotFoundException("Could not create '"+name+"' (maybe a missing/malformed parameter?) Exception raised: "+e.getMessage());
			}  
			 Group grp= IServer.getGroup(name);
			User user=IServer.getUser(usr);
			grp.addMember(user);
			String returnValue = new JSONObject (IServer.getGroup(name)).toString();
			logger.info("IServerJersey - AddUserToGroup (group"+ name +"user"+ usr);
			DatabaseManager.getCurrentDatabaseManager().commit();
		    return returnValue;
	   }
	   
	   
	   /**
	    * Creates a new group instance and adds it to the collections 'Groups' and
	    * 'Users'.
	    * @param name the name of the group instance.
	    * @param description the description of the group instance.
	    * @return the new group instance.
	    */
	   @POST
	   @Consumes(MediaType.APPLICATION_JSON)
	   @Produces(MediaType.APPLICATION_JSON)
	   @Path("/groups/{groupname}")
	   public static String createGroup(@PathParam("groupname") String name, String json_params) {
		   String description = null;
		   JSONObject params = null;
			try {
				params = new JSONObject(json_params);
			description = params.getString("description");
		} catch (JSONException e) {
			logger.log(Level.WARNING, "Problem when creating JSON result", e);
			DatabaseManager.getCurrentDatabaseManager().commit();
			throw new NotFoundException("Could not create '"+name+"' (maybe a missing/malformed parameter?) Exception raised: "+e.getMessage());
		}
		   
	    String returnValue = new JSONObject(IServer.createGroup(name, description)).toString();
	    logger.info("IServerJersey - createGroup(name: "+name+", description: "+description+")");
	    DatabaseManager.getCurrentDatabaseManager().commit();
	    return returnValue;
	      
	   } // createGroup
	   
	   /**
	    * Deletes a group and removes it from the collections 'Groups' and 'Users'
	    * and from the associations 'HasMembers', 'HasPreferences' and 'AccessibleTo'
	    * and 'InaccessibleTo'. Note that the members of the group (individuals or
	    * groups) will not be deleted.
	    * @param group the group to be deleted.
	    */
	   @DELETE
	   @Path("/groups/{groupname}")
	   public static void deleteGroup(@PathParam("groupname") String name) {
		   Group grp =  IServer.getGroup(name);
		   logger.info("IServerJersey - deleteGroup("+name+") -> "+grp);
		   if(grp != null){
			   IServer.deleteGroup(grp, false);
		   }
		   DatabaseManager.getCurrentDatabaseManager().commit();
	   } // deleteGroup
	   

	   /**
	    * Returns the group with the specified name.
	    * @param name the name of the group which has to be returned.
	    * @return the group with the specified name.
	    */
	   @GET
	   @Produces(MediaType.APPLICATION_JSON)
	   @Path("/groups/{groupname}")
	   public static String getGroup(@PathParam("groupname") String name) {
		   Group grp =  IServer.getGroup(name);
		   logger.info("IServerJersey - getGroup("+name+") -> "+grp);
		   DatabaseManager.getCurrentDatabaseManager().commit();
		   if(grp == null){
			   return new JSONObject().toString();
		   }else{
			   return (new JSONObject(grp).toString());
		   }
	   } // getGroup
	   
	   
	   @POST
	   @Consumes(MediaType.APPLICATION_JSON)
	   @Produces(MediaType.APPLICATION_JSON)
	   @Path("/individuals/{individualname}")
	   public static String createIndividual(@PathParam("individualname") String name, String json_params) {
		   	   
		   String description = null;
		   String login = null;
		   String password = null;
		   JSONObject params = null;
			try {
				params = new JSONObject(json_params);
				description = params.getString("description");
				login = params.getString("login");
				password = params.getString("password");
			} catch (JSONException e) {
				logger.log(Level.WARNING, "Problem when creating JSON result", e);
				DatabaseManager.getCurrentDatabaseManager().commit();
				throw new NotFoundException("Could not create '"+name+"' (maybe a missing/malformed parameter?) Exception raised: "+e.getMessage());
			}   
		    String returnValue = new JSONObject(IServer.createIndividual(name, description, login, password)).toString();
		    logger.info("IServerJersey - createIndividual(name: "+name+", description: "+description+", login: "+login+", password: "+password+")");
		    DatabaseManager.getCurrentDatabaseManager().commit();
		    return returnValue;
	   }
	   
	   
	   @DELETE
	   @Path("/individuals/{individualname}")
	   public static void deleteIndividual(@PathParam("individualname") String name) {
		      Individual ind =  IServer.getIndividual(name);
		      logger.info("IServerJersey - deleteIndividual("+name+") -> "+ind);
			   if(ind != null){
				   IServer.deleteIndividual(ind);
			   }
			   DatabaseManager.getCurrentDatabaseManager().commit();
		   } // deleteIndividual
	   
	   
	   @GET
	   @Produces(MediaType.APPLICATION_JSON)
	   @Path("/individuals/{individualname}")
	   public static String getIndividual(@PathParam("individualname") String name) {
		   Individual ind =  IServer.getIndividual(name);
		   logger.info("IServerJersey - getIndividual("+name+") -> "+ind);
		   DatabaseManager.getCurrentDatabaseManager().commit();
		   if(ind == null){
			   return new JSONObject().toString();
		   }else{
			   return (new JSONObject(ind).toString());
		   }
		   } // getIndividual
	   
	   
	   public static Layer createLayer(String name) {
		      Layer layer = new Layer();
		      layer.setName(name);
		      layer.setActive(true);
		      DatabaseManager.getCurrentDatabaseManager().create(layer);
		      IServerJersey.fireLayerInitialised(new LayerEvent(layer));
		      return layer;
		   } // createLayer
	   
	   
	   public static Layer createLayer(String name, int position) {   
		   	  Layer layer = new Layer();
		      layer.setName(name);
		      layer.setPosition(position);
		      layer.setActive(true);
		      DatabaseManager.getCurrentDatabaseManager().create(layer);
		      IServerJersey.fireLayerInitialised(new LayerEvent(layer));
		      return layer;
		   } // createLayer
	   
	   
	   public static void deleteLayer(Layer layer) {
		      IServerJersey.fireLayerDeleted(new LayerEvent(layer));
		      associationOnLayer().remove(new Object[] { layer, null });
		      DatabaseManager.getCurrentDatabaseManager().delete(layer);
		   } // deleteLayer
	   
	   public static Layer getLayer(String name) {
		   return (Layer) DatabaseManager.getCurrentDatabaseManager().read(Layer.class, "name == \""+name+"\"").getFirst();
	   } // getLayer
	   
	   			   
			   @POST
			   @Consumes(MediaType.APPLICATION_JSON)
			   @Produces(MediaType.APPLICATION_JSON)
			   @Path("/links/{linkname}")
			   public static String createLink(@PathParam("linkname") String name, String json_params) {
				   	   
				   String sourceSt = null;
				   String targetSt = null;
				   String creatorSt = null;
				   JSONObject params = null;
					try {
						params = new JSONObject(json_params);
						sourceSt = params.getString("source");
						targetSt = params.getString("target");
						creatorSt = params.getString("creator");
					} catch (JSONException e) {
						logger.log(Level.WARNING, "Problem when creating JSON result", e);
						DatabaseManager.getCurrentDatabaseManager().commit();
						throw new NotFoundException("Could not create '"+name+"' (maybe a missing/malformed parameter?) Exception raised: "+e.getMessage());
					}
					Individual creator = IServer.getIndividual(creatorSt);
					if(creator == null){
						DatabaseManager.getCurrentDatabaseManager().commit();
						throw new NotFoundException("Creator '"+creatorSt+"' could not be found - resource '"+name+"' not created.");
					}
					Entity source = IServer.getEntity(sourceSt);
					Entity target = IServer.getEntity(targetSt);
				    String returnValue = new JSONObject(IServer.createLink(name, source, target, creator)).toString();
				    logger.info("IServerJersey - createLink(name: "+name+", source: "+source.toString()+", target: "+target.toString()+")");
					   
				    DatabaseManager.getCurrentDatabaseManager().commit();
				    return returnValue;
		   } // createLink
	   
	   
			   @DELETE
			   @Path("/links/{linkname}")
			   public static void deleteLink(@PathParam("linkname") String name) {
				      Link link =  IServer.getLink(name);
				      logger.info("IServerJersey - deleteLink("+name+") -> "+link);
					   if(link != null){
						   IServer.deleteLink(link);
					   }
					   DatabaseManager.getCurrentDatabaseManager().commit();
				   } // deleteLink
			   
			   
			   @GET
			   @Produces(MediaType.APPLICATION_JSON)
			   @Path("/links/{linkname}")
			   public static String getLink(@PathParam("linkname") String name) {
				   Link link =  IServer.getLink(name);
				   logger.info("IServerJersey - getLink("+name+") -> "+link);
				   String returnValue = null;
				   if(link == null){
					   returnValue = new JSONObject().toString();
				   }else{
					   returnValue = (new JSONObject(link).toString());
				   }
				   DatabaseManager.getCurrentDatabaseManager().commit();
				   return returnValue;
				   } // getLink

			   
			   @POST
			   @Consumes(MediaType.APPLICATION_JSON)
			   @Produces(MediaType.APPLICATION_JSON)
			   @Path("/docComp/{linkname}")
			   public static String createDocCompLink(@PathParam("linkname") String name, String json_params) {
				   DocComponent theLink=null; 
				   Entity target=null;
				   String sourceSt = null;
				   JSONArray targetSt = null;
				   String creatorSt = null;
				   JSONObject params = null;
					try {
						params = new JSONObject(json_params);
						sourceSt = params.getString("source");
						targetSt = params.getJSONArray("target");					
						creatorSt = params.getString("creator");
					} catch (JSONException e) {
						logger.log(Level.WARNING, "Problem when creating JSON result", e);
						DatabaseManager.getCurrentDatabaseManager().commit();
						throw new NotFoundException("Could not create '"+name+"' (maybe a missing/malformed parameter?) Exception raised: "+e.getMessage());
					}
					Individual creator = IServer.getIndividual(creatorSt);
					if(creator == null){
						DatabaseManager.getCurrentDatabaseManager().commit();
						throw new NotFoundException("Creator '"+creatorSt+"' could not be found - resource '"+name+"' not created.");
					}
					Entity source = IServer.getEntity(sourceSt);
					
					try{
					target = IServer.getEntity(targetSt.getString(0));
					theLink= IServer.createDocCompenentLink(name, source, target, creator);
					theLink.orderSetOfTargets.add(target);
									} catch(JSONException e){}
					
					
			         
					if(targetSt.length()>1){
                     
						try{
						for(int i=1;i<targetSt.length();i++){
							
							target=IServer.getEntity(targetSt.getString(i));
							theLink.addTarget(target);
							theLink.orderSetOfTargets.add(target);
						}
						} catch(JSONException e){}
						
					}
				    String returnValue = new JSONObject(theLink).toString();
				    logger.info("IServerJersey - createStructuralLink(name: "+name+", source: "+source.toString()+", target: "+target.toString()+")");
				    logger.info(theLink.getOrderTargets().size()+" hello");
					   
				    DatabaseManager.getCurrentDatabaseManager().commit();
				    return returnValue;
		   } // createStructuralLink
	   
	   
	/*** Update Specific Structural Link by adding more targets
	 * 
	 * @param name
	 */
			   
			   
			   @PUT
			   @Consumes(MediaType.APPLICATION_JSON)
			   @Produces(MediaType.APPLICATION_JSON)
			   @Path("/docComp/addtargets/{strlink}")
			   public static String addMoreTargets(@PathParam("strlink") String name,String json_params)
			   {
				   DocComponent strLink = IServer.getDocComponentLink(name);
				   JSONArray trgs = null;
				   JSONObject params = null;
					try {
						params = new JSONObject(json_params);
						trgs = params.getJSONArray("target");
						for(int i=0;i<trgs.length();i++){
							
					strLink.addTarget(IServer.getEntity(trgs.getString(i)));
													}
						
					} catch (JSONException e) {
						logger.log(Level.WARNING, "Problem when creating JSON result", e);
						DatabaseManager.getCurrentDatabaseManager().commit();
						throw new NotFoundException("Could not create '"+name+"' (maybe a missing/malformed parameter?) Exception raised: "+e.getMessage());
					} 
					
					String returnValue = new JSONObject(strLink).toString();
				    DatabaseManager.getCurrentDatabaseManager().commit();
					 return returnValue;
					
					
			   }
			   
			   
			   
			   /** Updata Specific Structural Link by removing some targets
			    * 
			    * @param name
			    */
			   
			   
			   @PUT
			   @Consumes(MediaType.APPLICATION_JSON)
			   @Produces(MediaType.APPLICATION_JSON)
			   @Path("/docComp/removetargets/{strlink}")
			   public static String removeTargets(@PathParam("strlink") String name,String json_params)
			   {
				   DocComponent strLink = IServer.getDocComponentLink(name);
				   JSONArray trgs = null;
				   JSONObject params = null;
					try {
						params = new JSONObject(json_params);
						trgs = params.getJSONArray("target");
						for(int i=0;i<trgs.length();i++){
							
					strLink.removeTarget(IServer.getEntity(trgs.getString(i)));
													}
						
					} catch (JSONException e) {
						logger.log(Level.WARNING, "Problem when creating JSON result", e);
						DatabaseManager.getCurrentDatabaseManager().commit();
						throw new NotFoundException("Could not create '"+name+"' (maybe a missing/malformed parameter?) Exception raised: "+e.getMessage());
					} 
					
					String returnValue = new JSONObject(strLink).toString();
				    DatabaseManager.getCurrentDatabaseManager().commit();
					 return returnValue;
					
					
			   }
			   
			 
			   
			   
			   //******************************
		/*	   
			   
			   @DELETE
			   @Path("/docComp/{linkname}")
			   public static void deleteStructuralLink(@PathParam("linkname") String name) {
			//	   DocComponent link =  IServer.dgetStructuralLink(name);
				      logger.info("IServerJersey - deleteStructuralLink("+name+") -> "+link);
					   if(link != null){
						   
					
					boolean res=  IServer.deleteStructuralLink(link);
					if(res) logger.info("true");
					else logger.info("false");
						   
					   }
					  
					   DatabaseManager.getCurrentDatabaseManager().commit();
				   } // deleteStructuralLink
			   */
			   
			   @GET
			   @Produces(MediaType.APPLICATION_JSON)
			   @Path("/docComp/{linkname}")
			   public static String getDocCompLink(@PathParam("linkname") String name) {
				   StructuralLink link =  IServer.getStructuralLink(name);
				   logger.info("IServerJersey - getStructuralLink("+name+") -> "+link);
				   String returnValue = null;
				   if(link == null){
					   returnValue = new JSONObject().toString();
				   }else{
					   returnValue = (new JSONObject(link).toString());
				   }
				   DatabaseManager.getCurrentDatabaseManager().commit();
				   return returnValue;
				   } // getStructuralLink

	   
	 
	
	   
	   @POST
	   @Consumes(MediaType.APPLICATION_JSON)
	   @Produces(MediaType.APPLICATION_JSON)
	   @Path("/resources/raw/{resourcename}")
	   public static String createResource(@PathParam("resourcename") String name, String json_params) {
	   	   
	   String creatorSt = null;
	   JSONObject params = null;
		try {
			params = new JSONObject(json_params);
			creatorSt = params.getString("creator");
		} catch (JSONException e) {
			logger.log(Level.WARNING, "Problem when creating JSON result", e);
			DatabaseManager.getCurrentDatabaseManager().commit();
			throw new NotFoundException("Could not create '"+name+"' (maybe a missing/malformed parameter?) Exception raised: "+e.getMessage());
		}
		Individual creator = IServer.getIndividual(creatorSt);
		if(creator == null){
			DatabaseManager.getCurrentDatabaseManager().commit();
			throw new NotFoundException("Creator '"+creatorSt+"' could not be found - resource '"+name+"' not created.");
		}
		Resource resource = IServer.createResource(name, creator);
		logger.info("IServerJersey - createResource(name: "+name+", creator: "+creatorSt+")");
	    String returnValue = new JSONObject(resource).toString();
	    DatabaseManager.getCurrentDatabaseManager().commit();
		      return returnValue;
		   } // createResource
	   
	   
	   @GET
	   @Produces(MediaType.APPLICATION_JSON)
	   @Path("/resources/raw/{resourcename}")
	   public static String getResource(@PathParam("resourcename") String name) {
		   Resource rsc =  IServer.getResource(name);
		   logger.info("IServerJersey - getResource("+name+") -> "+rsc);
		   String returnValue = null;
		   if(rsc == null){
			   returnValue = new JSONObject().toString();
		   }else{
			   returnValue = (new JSONObject(rsc).toString());
		   }
		   DatabaseManager.getCurrentDatabaseManager().commit();
		   return returnValue;
	   } 
	   
	   @GET
	   @Produces(MediaType.APPLICATION_JSON)
	   @Path("/resources/_byindividual_/{individualname}")
	   public static String getResourcesByIndividual(@PathParam("individualname") String name) {
		   Collection<AbstractRslElement> resources = IServer.collectionResources();
		   ArrayList<AbstractRslElement> resByInd = new  ArrayList<AbstractRslElement>();
		   Individual ind =  IServer.getIndividual(name);
		   for(AbstractRslElement e : resources){
			   if(((Resource)e).getCreator().equals(ind)){
				   resByInd.add(e);
			   }
		   }
		   JSONObject returnObject = new JSONObject();
		   try{
		   for(AbstractRslElement i : resByInd){
			   returnObject.append(i.getName(), new JSONObject(i));
		   }
		   }
		   catch(JSONException e){
			   logger.log(Level.WARNING, "Problem when creating JSON result", e); 
		   }
		   logger.info("IServerJersey - getResourcesByIndividual() -> "+resources.size()+" results");
		   String returnValue = returnObject.toString();
		   DatabaseManager.getCurrentDatabaseManager().commit();
		   return returnValue;
	   } 
	   
	   @DELETE
	   @Path("/resources/raw/{resourcename}")
	   public static void deleteResource(@PathParam("resourcename") String name) {
		   
		   Resource rsc =  IServer.getResource(name);
		      
			   if(rsc != null){
				   IServer.deleteResource(rsc);
			   }
			   logger.info("IServerJersey - deleteResource("+name+") -> "+rsc);
			   DatabaseManager.getCurrentDatabaseManager().commit();
		   } // deleteResource
	   
	   
	   @POST
	   @Consumes(MediaType.APPLICATION_JSON)
	   @Produces(MediaType.APPLICATION_JSON)
	   @Path("/resources/text/{resourcename}")
	   public static String createTextComp(@PathParam("resourcename") String name, String json_params) {
	   	   
	   String creatorSt = null;
	   String content = null;
	//   HashSet <String> usrAuth= null; //AuthorizedUsers
	   
	   JSONObject params = null;
		try {
			params = new JSONObject(json_params);
			creatorSt = params.getString("creator");
			content = params.getString("content");
		} catch (JSONException e) {
			logger.log(Level.WARNING, "Problem when creating JSON result", e);
			DatabaseManager.getCurrentDatabaseManager().commit();
			throw new NotFoundException("Could not create '"+name+"' (maybe a missing/malformed parameter?) Exception raised: "+e.getMessage());
		}
		Individual creator = IServer.getIndividual(creatorSt);
		if(creator == null){
			DatabaseManager.getCurrentDatabaseManager().commit();
			throw new NotFoundException("Creator '"+creatorSt+"' could not be found - resource '"+name+"' not created.");
		}
		TextComp resource = IExtendedServer.createTextComp(name, creator, content);
		logger.info("IServerJersey - createTextComp(name: "+name+", creator: "+creatorSt+")");
		if(params != null){
			try{
				String encoding = params.getString("encoding");
				resource.setEncoding(encoding);
			}catch (JSONException e) {} //optional parameter... if it does not exist, not a problem
		}
	
	
		// Authorized Users  (Optional)
		if(params!= null){
			try{
				JSONArray recs = params.getJSONArray("authusers");
		
				for(int i=0;i<recs.length();i++){
				
					String userName = recs.getString(i);
					resource.addAuthorisedUser(IServer.getUser(userName));
				}
				
							} catch (JSONException e) {}
		} // authorized users
			
		//Not Authorized Users
			if(params!= null)
			{
				try
				{                                      
					JSONArray re = params.getJSONArray("unauthusers");
				
	
				for(int i=0;i<re.length();i++){
					
					String usName = re.getString(i);
					resource.addUnauthorisedUser(IServer.getUser(usName));
				}
					
				} catch  (JSONException e) {}
			} //unAuthorizedUsers
		
				
	    String returnValue = new JSONObject(resource).toString();
	    DatabaseManager.getCurrentDatabaseManager().commit();
		 return returnValue;
		   } // createTextComp
	   
	   
	   
	   /* Add A set of Authorized Users for specific Entity */
	   /**
	    * Update specific Entity by adding some authorized users
	    * 
	    * @param name
	    * @return
	    */
	   
	   
	   @PUT
	   @Consumes(MediaType.APPLICATION_JSON)
	   @Produces(MediaType.APPLICATION_JSON)
	   @Path("/entity/addauthuser/{entityname}")
	   public static String addAuthUserToTextResource(@PathParam("entityname") String name,String json_params)
	   {
		   Entity resource= IServer.getEntity(name);
	//	   TextComp resource= IExtendedServer.getTextComp(name);
		   JSONArray usrs = null;
		   JSONObject params = null;
			try {
				params = new JSONObject(json_params);
				usrs = params.getJSONArray("users");
				for(int i=0;i<usrs.length();i++){
					
					String usName = usrs.getString(i);
					resource.addAuthorisedUser(IServer.getUser(usName));
				}
				
			} catch (JSONException e) {
				logger.log(Level.WARNING, "Problem when creating JSON result", e);
				DatabaseManager.getCurrentDatabaseManager().commit();
				throw new NotFoundException("Could not create '"+name+"' (maybe a missing/malformed parameter?) Exception raised: "+e.getMessage());
			} 
			
			String returnValue = new JSONObject(resource).toString();
		    DatabaseManager.getCurrentDatabaseManager().commit();
			 return returnValue;
			
			
	   }
	   
	  
	   /** Add some Properties to specific Entity
	    * 
	    *  Take array of Property objects
	    *  
	    *   "properties": [
        *    {
        *       "key": "8817",
        *        "value": "NEW YORK CITY"
        *     },
        *     {
        *        "key": "2873",
        *         "value": "UNITED STATES"
        *        }]
	    */
	   
	   @PUT
	   @Consumes(MediaType.APPLICATION_JSON)
	   @Produces(MediaType.APPLICATION_JSON)
	   @Path("/entity/addproperty/{entityname}")
	   public static String addPropertyToTextResource(@PathParam("entityname") String name,String json_params)
	   {
		   Entity resource = IServer.getEntity(name);
		 //  TextComp resource= IExtendedServer.getTextComp(name);
		   JSONArray propt = null;
		   JSONObject params = null;
			try {
				params = new JSONObject(json_params);
				propt = params.getJSONArray("properties");
				for(int i=0;i<propt.length();i++){
					
					JSONObject rec = propt.getJSONObject(i);
				    String key = rec.getString("key");
					String value= rec.getString("value");
					resource.addProperty(key, value);
									}
				
			} catch (JSONException e) {
				logger.log(Level.WARNING, "Problem when creating JSON result", e);
				DatabaseManager.getCurrentDatabaseManager().commit();
				throw new NotFoundException("Could not create '"+name+"' (maybe a missing/malformed parameter?) Exception raised: "+e.getMessage());
			} 
			
			String returnValue = new JSONObject(resource).toString();
		    DatabaseManager.getCurrentDatabaseManager().commit();
			 return returnValue;
			
			
	   }
	   
	   
	   /** Romve properteis from specific Entity
	    * 
	    * Take json array of keys
	    * 
	    * "key":[ "key1", "key2", ....]
	    */
	   @PUT
	   @Consumes(MediaType.APPLICATION_JSON)
	   @Produces(MediaType.APPLICATION_JSON)
	   @Path("/entity/removeproperty/{entityname}")
	   public static String removePropertyToTextResource(@PathParam("entityname") String name,String json_params)
	   { 
		   Entity resource = IServer.getEntity(name);
		//   TextComp resource= IExtendedServer.getTextComp(name);
		   JSONArray propt = null;
		   JSONObject params = null;
			try {
				params = new JSONObject(json_params);
				propt = params.getJSONArray("key");
				for(int i=0;i<propt.length();i++){
					
					String removedKey = propt.getString(i);
					resource.removeProperty(removedKey);
					
									}
				
			} catch (JSONException e) {
				logger.log(Level.WARNING, "Problem when creating JSON result", e);
				DatabaseManager.getCurrentDatabaseManager().commit();
				throw new NotFoundException("Could not create '"+name+"' (maybe a missing/malformed parameter?) Exception raised: "+e.getMessage());
			} 
			
			String returnValue = new JSONObject(resource).toString();
		    DatabaseManager.getCurrentDatabaseManager().commit();
			 return returnValue;
			
			
	   }
	   
	   
	   
	   
	   /** Add Unauthorized user to a specific entity
	    * 
	    * @param name
	    * @return
	    */
	   @PUT
	   @Consumes(MediaType.APPLICATION_JSON)
	   @Produces(MediaType.APPLICATION_JSON)
	   @Path("/entity/addunauthuser/{entityname}")
	   public static String addunAuthUserToTextResource(@PathParam("entityname") String name,String json_params)
	   {
		   Entity resource = IServer.getEntity(name);
		//   TextComp resource= IExtendedServer.getTextComp(name);
		   JSONArray usrs = null;
		   JSONObject params = null;
			try {
				params = new JSONObject(json_params);
				usrs = params.getJSONArray("users");
				for(int i=0;i<usrs.length();i++){
					
					String usName = usrs.getString(i);
					resource.addUnauthorisedUser(IServer.getUser(usName));
				}
				
			} catch (JSONException e) {
				logger.log(Level.WARNING, "Problem when creating JSON result", e);
				DatabaseManager.getCurrentDatabaseManager().commit();
				throw new NotFoundException("Could not create '"+name+"' (maybe a missing/malformed parameter?) Exception raised: "+e.getMessage());
			} 
			
			String returnValue = new JSONObject(resource).toString();
		    DatabaseManager.getCurrentDatabaseManager().commit();
			 return returnValue;
			
			
	   }
	   
	   
	 /** By Ahmed Tayeh
	  *  Get All TextComp created by specific user
	  * 
	  * @param name
	  * @return
	  */
	   
	   @GET
	   @Produces(MediaType.APPLICATION_JSON)
	   @Path("/resources/getalltextcompfromuser/{indname}")
	   public static String getAllTextCompByInd(@PathParam("indname") String name) {
		   
		   TextComp rsc =  IExtendedServer.getTextCompByUser(name);
		   logger.info("IServerJersey - getTextCompByUser("+name+") -> "+rsc);
		   String returnValue = null;
		   if(rsc == null){
			   returnValue = new JSONObject().toString();
		   }else{
			   returnValue = (new JSONObject(rsc).toString());
		   }
		   DatabaseManager.getCurrentDatabaseManager().commit();
		   return returnValue;
	   } 
	   
	   
	   
	   
	   @GET
	   @Produces(MediaType.APPLICATION_JSON)
	   @Path("/resources/text/{resourcename}")
	   public static String getTextComp(@PathParam("resourcename") String name) {
		   TextComp rsc =  IExtendedServer.getTextComp(name);
		   logger.info("IServerJersey - getTextComp("+name+") -> "+rsc);
		   String returnValue = null;
		   if(rsc == null){
			   returnValue = new JSONObject().toString();
		   }else{
			   returnValue = (new JSONObject(rsc).toString());
		   }
		   DatabaseManager.getCurrentDatabaseManager().commit();
		   return returnValue;
	   } 
	   
	   @DELETE
	   @Path("/resources/text/{resourcename}")
	   public static void deleteTextComp(@PathParam("resourcename") String name) {
		   
		   TextComp rsc =  IExtendedServer.getTextComp(name);
		      
			   if(rsc != null){
				   IExtendedServer.deleteTextComp(rsc);
			   }
			   logger.info("IServerJersey - deleteTextComp("+name+") -> "+rsc);
			   DatabaseManager.getCurrentDatabaseManager().commit();
		   } // deleteResource
	   
	   
	   public static Selector createSelector(String name, Layer layer,
		         Resource resource, Individual creator) {

		      Selector selector = new Selector();
		      selector.setName(name);
		      selector.setCreator(creator);
		      selector.setLayer(layer);
		      selector.setLayer(layer);
		      resource.addSelector(selector);
		      fireSelectorInitialised(new SelectorEvent(selector));
		      DatabaseManager.getCurrentDatabaseManager().create(selector);
		      return selector;
		   } // createSelector
	   
	   public static void deleteSelector(Selector selector) {
		      fireSelectorDeleted(new SelectorEvent(selector));
		      associationOnLayer().remove(new Object[] { selector, null });
		      associationRefersTo().remove(new Object[] { selector, null });
		      DatabaseManager.getCurrentDatabaseManager().delete(selector);
		   } // deleteSelector
	   
	   public static TextComp createTextComp(String name, String content,
		         Individual creator) {
		      TextComp textComp = new TextComp();
		      textComp.setName(name);
		      textComp.setContent(content);
		      textComp.setCreator(creator);
		      DatabaseManager.getCurrentDatabaseManager().create(textComp);
		      return textComp;
		   } // createTextComp
	   
	   
	   public static void deleteContainer(Resource container) {
		      associationContains().remove(new Object[] { container, null });
		      DatabaseManager.getCurrentDatabaseManager().delete(container);
		   } // deleteContainer
	
	   
	   
	  







}

