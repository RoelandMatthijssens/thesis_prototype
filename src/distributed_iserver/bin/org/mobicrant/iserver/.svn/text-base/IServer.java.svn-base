package org.mobicrant.iserver;

import java.util.Collection;
import java.util.HashSet;

import javax.activation.MimeType;

import org.mobicrant.iserver.db.DatabaseManager;
import org.mobicrant.iserver.db.DatabaseManager.DbSource;
import org.mobicrant.iserver.db.Result;
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



public class IServer {


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

		
	   private static HashSet<IServerListener> listeners = new HashSet<IServerListener>();

	   private static HashSet<EntityListener> entityListeners = new HashSet<EntityListener>();

	   private static HashSet<UserListener> userListeners = new HashSet<UserListener>();

	   private static HashSet<LayerListener> layerListeners = new HashSet<LayerListener>();

	   private static HashSet<LinkListener> linkListeners = new HashSet<LinkListener>();

	   private static HashSet<PreferenceListener> preferenceListeners = new HashSet<PreferenceListener>();

	   private static HashSet<ResourceListener> resourceListeners = new HashSet<ResourceListener>();

	   private static HashSet<SelectorListener> selectorListeners = new HashSet<SelectorListener>();
	   
	
	
	   public static Collection<AbstractRslElement> collectionActiveLayers() {
	      return DatabaseManager.getCurrentDatabaseManager().read(Layer.class, "isActive == true").getResults();
	   } // collectionActiveLayer
	
	
	   public static Collection<AbstractRslElement> collectionEntities() {
		   return DatabaseManager.getCurrentDatabaseManager().read(Entity.class, "").getResults();
	   } // collectionEntities


	   public static Collection<AbstractRslElement> collectionGroups() {
		   return DatabaseManager.getCurrentDatabaseManager().read(Group.class, "").getResults();
	   } // collectionActiveLayer


	   public static Collection<AbstractRslElement> collectionIndividuals() {
		   return DatabaseManager.getCurrentDatabaseManager().read(Individual.class, "").getResults();
	   } // collectionIndividuals


	   public static Collection<AbstractRslElement> collectionLayers() {
		   return DatabaseManager.getCurrentDatabaseManager().read(Layer.class, "").getResults();
	   } // collectionLayers


	   public static Collection<AbstractRslElement> collectionLinks() {
		   return DatabaseManager.getCurrentDatabaseManager().read(Link.class, "").getResults();
	   } // collectionLinks


	   public static Collection<AbstractRslElement> collectionMedia() {
		   return DatabaseManager.getCurrentDatabaseManager().read(Medium.class, "").getResults();
	   } // collectionMedia


	   public static Collection<AbstractRslElement> collectionPreferences() {
		   return DatabaseManager.getCurrentDatabaseManager().read(Parameter.class, "").getResults();
	   } // collectionPreferences


	   public static Collection<AbstractRslElement> collectionResources() {
		   return DatabaseManager.getCurrentDatabaseManager().read(Resource.class, "").getResults();
	   } // collectionResources

	   
	   public static Collection<AbstractRslElement> collectionSelectors() {
		   return DatabaseManager.getCurrentDatabaseManager().read(Selector.class, "").getResults();
	   } // collectionSelectors


	   public static Collection<AbstractRslElement> collectionUsers() {
		   return DatabaseManager.getCurrentDatabaseManager().read(User.class, "").getResults();
	   } // collectionUsers

	   
	   /*
	   public static OMAssociation associationAccessibleTo() {
	      return getWorkspace().getAssociation(Schema.ASSOCIATION_ACCESSIBLE_TO);
	   } // associationAccessibleTo


	   public static OMAssociation associationContains() {
	      return getWorkspace().getAssociation(Schema.ASSOCIATION_CONTAINS);
	   } // associationContains


	   public static OMAssociation associationCreatedBy() {
	      return getWorkspace().getAssociation(Schema.ASSOCIATION_CREATED_BY);
	   } // associationCreatedBy


	   public static OMAssociation associationHasCreator() {
	      return getWorkspace().getAssociation(Schema.ASSOCIATION_HAS_CREATOR);
	   } // associationHasCreator


	   public static OMAssociation associationHasMembers() {
	      return getWorkspace().getAssociation(Schema.ASSOCIATION_HAS_MEMBERS);
	   } // associationHasMembers


	   public static OMAssociation associationHasPreferences() {
	      return getWorkspace().getAssociation(Schema.ASSOCIATION_HAS_PREFERENCES);
	   } // associationHasPreferences


	   public static OMAssociation associationHasTemplate() {
	      return getWorkspace().getAssociation(Schema.ASSOCIATION_HAS_TEMPLATE);
	   } // associationHasTemplate


	   public static OMAssociation associationHasType() {
	      return getWorkspace().getAssociation(Schema.ASSOCIATION_HAS_TYPE);
	   } // associationHasType


	   public static OMAssociation associationHasSource() {
	      return getWorkspace().getAssociation(Schema.ASSOCIATION_HAS_SOURCE);
	   } // associationHasSource


	   public static OMAssociation associationHasTarget() {
	      return getWorkspace().getAssociation(Schema.ASSOCIATION_HAS_TARGET);
	   } // associationHasTarget


	   public static OMAssociation associationInaccessibleTo() {
	      return getWorkspace().getAssociation(Schema.ASSOCIATION_INACCESSIBLE_TO);
	   } // associationInaccessibleTo


	   public static OMAssociation associationOnLayer() {
	      return getWorkspace().getAssociation(Schema.ASSOCIATION_ON_LAYER);
	   } // associationOnLayer


	   public static OMAssociation associationRefersTo() {
	      return getWorkspace().getAssociation(Schema.ASSOCIATION_REFERS_TO);
	   } // associationRefersTo
	   */
	   
	   public static Entity getEntity(String name) {
		    Result entity = DatabaseManager.getCurrentDatabaseManager().read(Entity.class, "name == \""+name+"\"");
		   return (Entity)entity.getFirst();
	   } // getEntity
	   
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
	   public static User getUser(String name) {
		   return ((User)DatabaseManager.getCurrentDatabaseManager().read(User.class, "name == \""+name+"\"").getFirst());
	   } // getUser


	   /**
	    * Creates a new group instance and adds it to the collections 'Groups' and
	    * 'Users'.
	    * @param name the name of the group instance.
	    * @param description the description of the group instance.
	    * @return the new group instance.
	    */
	   public static Group createGroup(String name, String description) {
	      Group group = new Group();
	      group.setName(name);
	      group.setDescription(description);
	      DatabaseManager.getCurrentDatabaseManager().create(group);
	      fireUserInitialised(new UserEvent(group));
	      return group;
	   } // createGroup
	   
	   /**
	    * Deletes a group and removes it from the collections 'Groups' and 'Users'
	    * and from the associations 'HasMembers', 'HasPreferences' and 'AccessibleTo'
	    * and 'InaccessibleTo'. Note that the members of the group (individuals or
	    * groups) will not be deleted.
	    * @param group the group to be deleted.
	    */
	   public static void deleteGroup(Group group) {
	      deleteGroup(group, false);
	   } // deleteGroup

	   public static void deleteGroup(Group group, boolean recursive) {
		      if (recursive) {
		    	 throw new UnsupportedOperationException("IServer.delete() -- 'true' option for parameter 'recursive' not implemented");

		      }
		      //associationHasMembers().remove(new Object[] { group, null });
		      DatabaseManager.getCurrentDatabaseManager().delete(group);
		   } // deleteGroup
	   

	   /**
	    * Returns the group with the specified name.
	    * @param name the name of the group which has to be returned.
	    * @return the group with the specified name.
	    */
	   public static Group getGroup(String name) {
		    Result grps = DatabaseManager.getCurrentDatabaseManager().read(Group.class, "name == \""+name+"\"");
		   return (Group)grps.getFirst();
	   } // getGroup
	   
	   
	   public static Individual createIndividual(String name, String description,
		         String login, String password) {
		   Individual individual = new Individual();
		   individual.setName(name);
		   individual.setDescription(description);
		   individual.setLogin(login);
		   individual.setPassword(password);
		   DatabaseManager.getCurrentDatabaseManager().create(individual);
		   fireUserInitialised(new UserEvent(individual));
		   return individual;
	   }
	   
	   
	   public static void deleteIndividual(Individual individual) {
		 //     associationCreatedBy().remove(new Object[] { null, individual });
		      DatabaseManager.getCurrentDatabaseManager().delete(individual);
		   } // deleteIndividual
	   
	   
	   public static Individual getIndividual(String name) {
		   return (Individual) DatabaseManager.getCurrentDatabaseManager().read(Individual.class, "name == \""+name+"\"").getFirst();
		   } // getIndividual
	   
	   
	   public static Layer createLayer(String name) {
		      Layer layer = new Layer();
		      layer.setName(name);
		      layer.setActive(true);
		      DatabaseManager.getCurrentDatabaseManager().create(layer);
		      IServer.fireLayerInitialised(new LayerEvent(layer));
		      return layer;
		   } // createLayer
	   
	   
	   public static Layer createLayer(String name, int position) {   
		   	  Layer layer = new Layer();
		      layer.setName(name);
		      layer.setPosition(position);
		      layer.setActive(true);
		      DatabaseManager.getCurrentDatabaseManager().create(layer);
		      IServer.fireLayerInitialised(new LayerEvent(layer));
		      return layer;
		   } // createLayer
	   
	   
	   public static void deleteLayer(Layer layer) {
		      IServer.fireLayerDeleted(new LayerEvent(layer));
		      //associationOnLayer().remove(new Object[] { layer, null });
		      DatabaseManager.getCurrentDatabaseManager().delete(layer);
		   } // deleteLayer
	   
	   public static Layer getLayer(String name) {
		   return (Layer) DatabaseManager.getCurrentDatabaseManager().read(Layer.class, "name == \""+name+"\"").getFirst();
	   } // getLayer
	   
	   
	   public static Link createLink(String name, Entity source, Entity target, Individual creator) {
		   	  Link link = new Link();
		      link.setName(name);
		      link.setCreator(creator);
		      link.addSource(source);
		      link.addTarget(target);
		      link.setCreator(creator);
		      DatabaseManager.getCurrentDatabaseManager().create(link);
		      fireLinkInitialised(new LinkEvent(link));
		      return link;
		   } // createLink
	   
	   public static Link getLink(String name) {
		   return (Link) DatabaseManager.getCurrentDatabaseManager().read(Link.class, "name == \""+name+"\"").getFirst();
	   } // getLayer
	   
	   public static void deleteLink(Link link) {
		      IServer.fireLinkDeleted(new LinkEvent(link));
		      //associationHasSource().remove(new Object[] { link, null });
		      //associationHasTarget().remove(new Object[] { link, null });
		      DatabaseManager.getCurrentDatabaseManager().delete(link);
		   } // deleteLink
	   
	   
	   public static DocComponent createDocCompenentLink(String name, Entity source, Entity target, Individual creator) {
		   DocComponent link = new DocComponent();
		      link.setName(name);
		      link.setCreator(creator);
		      link.addSource(source);
		      link.addTarget(target);
		      link.setCreator(creator);
		      DatabaseManager.getCurrentDatabaseManager().create(link);
		      fireLinkInitialised(new LinkEvent(link));
		      return link;
		   } // createLink
	   
	   public static DocComponent getDocComponentLink(String name) {
		   return (DocComponent) DatabaseManager.getCurrentDatabaseManager().read(StructuralLink.class, "name == \""+name+"\"").getFirst();
	   } // getLayer
	   
	   public static boolean deleteStructuralLink(StructuralLink link) {
		   //  IServer.fireLinkDeleted(new LinkEvent(link));
		   //   associationHasSource().remove(new Object[] { link, null });
		    //  associationHasTarget().remove(new Object[] { link, null });
		   return   DatabaseManager.getCurrentDatabaseManager().delete(link);
		   } // deleteLink

	   
	   public static Medium createMedium(String name, String description,
		         MimeType content, Individual creator) {
		      Medium medium = new Medium();
		      medium.setName(name);
		      medium.setDescription(description);
		      medium.setMimeType(content);
		      medium.setCreator(creator);
		      DatabaseManager.getCurrentDatabaseManager().create(medium);
		      fireResourceInitialised(new ResourceEvent(medium));
		      return medium;
		   } // createMedium
	   
	   public static Parameter createPreference(String key, String value) {
		      Parameter preference = new Parameter(key, value);
		      firePreferenceCreated(new ParameterEvent(preference));
		      collectionPreferences().add(preference);
		      firePreferenceInitialised(new ParameterEvent(preference));
		      DatabaseManager.getCurrentDatabaseManager().create(preference);
		      return preference;
		   } // createPreference
	   
	   public static void deletePreference(Parameter preference) {
		      firePreferenceDeleted(new ParameterEvent(preference));
		      //associationHasPreferences().remove(new Object[] { null, preference });
		      DatabaseManager.getCurrentDatabaseManager().delete(preference);
		   } // deletePreference
	   
	   
	   public static Resource createResource(String name, Individual creator) {
		      Resource resource = new Resource();
		      resource.setName(name);
		      resource.setCreator(creator);
		      DatabaseManager.getCurrentDatabaseManager().create(resource);
		      fireResourceInitialised(new ResourceEvent(resource));
		      return resource;
		   } // createResource
	   
	   
	   public static Resource getResource(String name){
		   return (Resource) DatabaseManager.getCurrentDatabaseManager().read(Resource.class, "name == \""+name+"\"").getFirst();
	   }
	   
	   
	   
	   public static void deleteResource(Resource resource) {
		      fireResourceDeleted(new ResourceEvent(resource));
		      //associationRefersTo().remove(new Object[] { null, resource });
		      //associationContains().remove(new Object[] { null, resource });
		      DatabaseManager.getCurrentDatabaseManager().delete(resource);
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
		      //associationOnLayer().remove(new Object[] { selector, null });
		      //associationRefersTo().remove(new Object[] { selector, null });
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
		      //associationContains().remove(new Object[] { container, null });
		      DatabaseManager.getCurrentDatabaseManager().delete(container);
		   } // deleteContainer
	   
	   
	   /**
	    * Adds an EntityListener to the iServer database.
	    * @param listener the EnityListener to be added.
	    */
	   public static synchronized void addEntityListener(EntityListener listener) {
	      if (listener == null) {
	         return;
	      }
	      else {
	         entityListeners.add(listener);
	      }

	   } // addEntityListener


	   /**
	    * Removes an EntityListener from the iServer database.
	    * @param listener the EntityListener to be removed.
	    */
	   public static synchronized void removeEntityListener(EntityListener listener) {
	      entityListeners.remove(listener);
	   } // removeEntityListener


	   /**
	    * Adds an IServerListener to the iServer database.
	    * @param listener the IServerListener to be added.
	    */
	   public static synchronized void addIServerListener(IServerListener listener) {
	      if (listener == null) {
	         return;
	      }
	      else {
	         listeners.add(listener);
	      }

	   } // addIServerListener


	   /**
	    * Removes an IServerListener from the iServer database.
	    * @param listener the IServerListener to be removed.
	    */
	   public static synchronized void removeIServerListener(IServerListener listener) {
	      listeners.remove(listener);
	   } // removeIServerListener


	   /**
	    * Adds a UserListener to the iServer database.
	    * @param listener the UserListener to be added.
	    */
	   public static synchronized void addUserListener(UserListener listener) {
	      if (listener == null) {
	         return;
	      }
	      else {
	         userListeners.add(listener);
	      }

	   } // addUserListener


	   /**
	    * Removes a UserListener from the iServer database.
	    * @param listener the UserListener to be removed.
	    */
	   public static synchronized void removeUserListener(UserListener listener) {
	      userListeners.remove(listener);
	   } // removeUserListener


	   /**
	    * Adds a LayerListener to the iServer database.
	    * @param listener the LayerListener to be added.
	    */
	   public static synchronized void addLayerListener(LayerListener listener) {
	      if (listener == null) {
	         return;
	      }
	      else {
	         layerListeners.add(listener);
	      }

	   } // addLayerListener


	   /**
	    * Removes a LayerListener from the iServer database.
	    * @param listener the LayerListener to be removed.
	    */
	   public static synchronized void removeLayerListener(LayerListener listener) {
	      layerListeners.remove(listener);
	   } // removeLayerListener


	   /**
	    * Adds a LinkListener to the iServer database.
	    * @param listener the LinkListener to be added.
	    */
	   public static synchronized void addLinkListener(LinkListener listener) {
	      addEntityListener(listener);

	      if (listener == null) {
	         return;
	      }
	      else {
	         linkListeners.add(listener);
	      }

	   } // addLinkListener


	   /**
	    * Removes a LinkListener from the iServer database.
	    * @param listener the LinkListener to be removed.
	    */
	   public static synchronized void removeLinkListener(LinkListener listener) {
	      removeEntityListener(listener);
	      linkListeners.remove(listener);
	   } // removeLinkListener


	   /**
	    * Adds a ResourceListener to the iServer database.
	    * @param listener the ResourceListener to be added.
	    */
	   public static synchronized void addResourceListener(ResourceListener listener) {
	      addEntityListener(listener);

	      if (listener == null) {
	         return;
	      }
	      else {
	         resourceListeners.add(listener);
	      }

	   } // addResourceListener


	   /**
	    * Removes a ResourceListener from the iServer database.
	    * @param listener the ResourceListener to be removed.
	    */
	   public static synchronized void removeResourceListener(
	         ResourceListener listener) {
	      removeEntityListener(listener);
	      resourceListeners.remove(listener);
	   } // removeResourceListener


	   /**
	    * Adds a SelectorListener to the iServer database.
	    * @param listener the SelectorListener to be added.
	    */
	   public static synchronized void addSelectorListener(SelectorListener listener) {
	      addEntityListener(listener);

	      if (listener == null) {
	         return;
	      }
	      else {
	         selectorListeners.add(listener);
	      }

	   } // addSelectorListener


	   /**
	    * Removes a SelectorListener from the iServer database.
	    * @param listener the SelectorListener to be removed.
	    */
	   public static synchronized void removeSelectorListener(
	         SelectorListener listener) {
	      removeEntityListener(listener);
	      selectorListeners.remove(listener);
	   } // removeSelectorListener


	   /**
	    * Adds a PreferenceListener to the iServer database.
	    * @param listener the PreferenceListener to be added.
	    */
	   public static synchronized void addPreferenceListener(
	         PreferenceListener listener) {
	      if (listener == null) {
	         return;
	      }
	      else {
	         preferenceListeners.add(listener);
	      }

	   } // addPreferenceListener


	   /**
	    * Removes a PreferenceListener from the iServer database.
	    * @param listener the PreferenceListener to be removed.
	    */
	   public static synchronized void removePreferenceListener(
	         PreferenceListener listener) {
	      preferenceListeners.remove(listener);
	   } // removePreferenceListener


	   /**
	    * Forwards the given create event to all registered 'IServerListeners' and
	    * 'UserListeners'.
	    * @param e the event to be fired.
	    */
	   protected static synchronized void fireUserCreated(UserEvent e) {
	      for (IServerListener listener : listeners) {
	         listener.userCreated(e);
	      }

	      for (UserListener listener : userListeners) {
	         listener.userCreated(e);
	      }

	   } // fireUserCreated


	   /**
	    * Forwards the given initialise event to all registered 'IServerListeners'
	    * and 'UserListeners'.
	    * @param e the event to be fired.
	    */
	   protected static synchronized void fireUserInitialised(UserEvent e) {
	      for (IServerListener listener : listeners) {
	         listener.userInitialised(e);
	      }

	      for (UserListener listener : userListeners) {
	         listener.userInitialised(e);
	      }

	   } // fireUserInitialised


	   /**
	    * Forwards the given update event to all registered 'IServerListeners' and
	    * 'UserListeners'.
	    * @param e the event to be fired.
	    */
	   protected static synchronized void fireUserUpdated(UserEvent e) {
	      for (IServerListener listener : listeners) {
	         listener.userUpdated(e);
	      }

	      for (UserListener listener : userListeners) {
	         listener.userUpdated(e);
	      }

	   } // fireUserUpdated


	   /**
	    * Forwards the given delete event to all registered 'IServerListeners' and
	    * 'UserListeners'..
	    * @param e the event to be fired.
	    */
	   protected static synchronized void fireUserDeleted(UserEvent e) {
	      for (IServerListener listener : listeners) {
	         listener.userDeleted(e);
	      }

	      for (UserListener listener : userListeners) {
	         listener.userDeleted(e);
	      }

	   } // fireUserDeleted


	   /**
	    * Forwards the given add authorised user event to all registered
	    * 'IServerListeners' and 'EntityListeners' (LinkListener, ResourceListener
	    * and SelectorListener).
	    * @param e the event to be fired.
	    */
	   protected static synchronized void fireAuthorisedUserAdded(
	         UserAddRemoveEvent e) {
	      for (IServerListener listener : listeners) {
	         listener.authorisedUserAdded(e);
	      }

	      for (EntityListener listener : entityListeners) {
	         listener.authorisedUserAdded(e);
	      }

	   } // fireAuthorisedUserAdded


	   /**
	    * Forwards the given remove authorised user event to all registered
	    * 'IServerListeners' and 'UserListeners' (LinkListener, ResourceListener and
	    * SelectorListener).
	    * @param e the event to be fired.
	    */
	   protected static synchronized void fireAuthorisedUserRemoved(
	         UserAddRemoveEvent e) {
	      for (IServerListener listener : listeners) {
	         listener.authorisedUserRemoved(e);
	      }

	      for (EntityListener listener : entityListeners) {
	         listener.authorisedUserRemoved(e);
	      }

	   } // fireAuthorisedUserRemoved


	   /**
	    * Forwards the given add unauthorised user event to all registered
	    * 'IServerListeners' and 'EntityListeners' (LinkListener, ResourceListener
	    * and SelectorListener).
	    * @param e the event to be fired.
	    */
	   protected static synchronized void fireUnauthorisedUserAdded(
	         UserAddRemoveEvent e) {
	      for (IServerListener listener : listeners) {
	         listener.unauthorisedUserAdded(e);
	      }

	      for (EntityListener listener : entityListeners) {
	         listener.unauthorisedUserAdded(e);
	      }

	   } // fireUnauthorisedUserAdded


	   /**
	    * Forwards the given remove unauthorised user event to all registered
	    * 'IServerListeners' and 'UserListeners' (LinkListener, ResourceListener and
	    * SelectorListener).
	    * @param e the event to be fired.
	    */
	   protected static synchronized void fireUnauthorisedUserRemoved(
	         UserAddRemoveEvent e) {
	      for (IServerListener listener : listeners) {
	         listener.unauthorisedUserRemoved(e);
	      }

	      for (EntityListener listener : entityListeners) {
	         listener.unauthorisedUserRemoved(e);
	      }

	   } // fireUnauthorisedUserRemoved


	   /**
	    * Forwards the given add member event to all registered 'IServerListeners'
	    * and 'UserListeners'..
	    * @param e the event to be fired.
	    */
	   protected static synchronized void fireMemberAdded(GroupEvent e) {
	      for (IServerListener listener : listeners) {
	         listener.memberAdded(e);
	      }

	      for (UserListener listener : userListeners) {
	         listener.memberAdded(e);
	      }

	   } // fireMemberAdded


	   /**
	    * Forwards the given remove member event to all registered 'IServerListeners'
	    * and 'UserListeners'..
	    * @param e the event to be fired.
	    */
	   protected static synchronized void fireMemberRemoved(GroupEvent e) {
	      for (IServerListener listener : listeners) {
	         listener.memberRemoved(e);
	      }

	      for (UserListener listener : userListeners) {
	         listener.memberRemoved(e);
	      }

	   } // fireMemberRemoved


	   /**
	    * Forwards the given add preference event to all registered
	    * 'IServerListeners' and 'UserListeners'.
	    * @param e the event to be fired.
	    */
	   protected static synchronized void firePreferenceAdded(
	         ParameterAddRemoveEvent e) {
	      for (IServerListener listener : listeners) {
	         listener.preferenceAdded(e);
	      }

	      for (UserListener listener : userListeners) {
	         listener.preferenceAdded(e);
	      }

	   } // firePreferenceAdded


	   /**
	    * Forwards the given remove preference event to all registered
	    * 'IServerListeners' and 'UserListeners'.
	    * @param e the event to be fired.
	    */
	   protected static synchronized void firePreferenceRemoved(
	         ParameterAddRemoveEvent e) {
	      for (IServerListener listener : listeners) {
	         listener.preferenceRemoved(e);
	      }

	      for (UserListener listener : userListeners) {
	         listener.preferenceRemoved(e);
	      }

	   } // firePreferenceRemoved


	   /**
	    * Forwards the given add property event to all registered 'IServerListeners'
	    * and 'EntityListeners' (LinkListener, ResourceListener and
	    * SelectorListener).
	    * @param e the event to be fired.
	    */
	   protected static synchronized void firePropertyAdded(PropertyAddRemoveEvent e) {
	      for (IServerListener listener : listeners) {
	         listener.propertyAdded(e);
	      }

	      for (EntityListener listener : entityListeners) {
	         listener.propertyAdded(e);
	      }

	   } // firePropertyAdded


	   /**
	    * Forwards the given remove property event to all registered
	    * 'IServerListeners' and 'UserListeners' (LinkListener, ResourceListener and
	    * SelectorListener).
	    * @param e the event to be fired.
	    */
	   protected static synchronized void firePropertyRemoved(
	         PropertyAddRemoveEvent e) {
	      for (IServerListener listener : listeners) {
	         listener.propertyRemoved(e);
	      }

	      for (EntityListener listener : entityListeners) {
	         listener.propertyRemoved(e);
	      }

	   } // firePropertyRemoved


	   /**
	    * Forwards the given create event to all registered 'iServerListeners' and
	    * 'LayerListeners'.
	    * @param e the event to be fired.
	    */
	   protected static synchronized void fireLayerCreated(LayerEvent e) {
	      for (IServerListener listener : listeners) {
	         listener.layerCreated(e);
	      }

	      for (LayerListener listener : layerListeners) {
	         listener.layerCreated(e);
	      }

	   } // fireLayerCreated


	   /**
	    * Forwards the given initialise event to all registered 'iServerListeners'
	    * and 'LayerListeners'.
	    * @param e the event to be fired.
	    */
	   protected static synchronized void fireLayerInitialised(LayerEvent e) {
	      for (IServerListener listener : listeners) {
	         listener.layerInitialised(e);
	      }

	      for (LayerListener listener : layerListeners) {
	         listener.layerInitialised(e);
	      }

	   } // fireLayerInitialised


	   /**
	    * Forwards the given update event to all registered 'iServerListeners' and
	    * 'LayerListeners'.
	    * @param e the event to be fired.
	    */
	   protected static synchronized void fireLayerUpdated(LayerEvent e) {
	      for (IServerListener listener : listeners) {
	         listener.layerUpdated(e);
	      }

	      for (LayerListener listener : layerListeners) {
	         listener.layerUpdated(e);
	      }

	   } // fireLayerUpdated


	   /**
	    * Forwards the given delete event to all registered 'iServerListeners' and
	    * 'LayerListeners'.
	    * @param e the event to be fired.
	    */
	   protected static synchronized void fireLayerDeleted(LayerEvent e) {
	      for (IServerListener listener : listeners) {
	         listener.layerDeleted(e);
	      }

	      for (LayerListener listener : layerListeners) {
	         listener.layerDeleted(e);
	      }

	   } // fireLayerDeleted


	   /**
	    * Forwards the given move event to all registered 'iServerListeners' and
	    * 'LayerListeners'.
	    * @param e the event to be fired.
	    */
	   protected static synchronized void fireLayerMoved(LayerEvent e) {
	      for (IServerListener listener : listeners) {
	         listener.layerMoved(e);
	      }

	      for (LayerListener listener : layerListeners) {
	         listener.layerMoved(e);
	      }

	   } // fireLayerMoved


	   /**
	    * Forwards the given create event to all registered 'iServerListeners' and
	    * 'LinkListeners'.
	    * @param e the event to be fired.
	    */
	   protected static synchronized void fireLinkCreated(LinkEvent e) {
	      for (IServerListener listener : listeners) {
	         listener.linkCreated(e);
	      }

	      for (LinkListener listener : linkListeners) {
	         listener.linkCreated(e);
	      }

	   } // fireLinkCreated


	   /**
	    * Forwards the given initialise event to all registered 'iServerListeners'
	    * and 'LinkListeners'.
	    * @param e the event to be fired.
	    */
	   protected static synchronized void fireLinkInitialised(LinkEvent e) {
	      for (IServerListener listener : listeners) {
	         listener.linkInitialised(e);
	      }

	      for (LinkListener listener : linkListeners) {
	         listener.linkInitialised(e);
	      }

	   } // fireLinkInitialised


	   /**
	    * Forwards the given update event to all registered 'iServerListeners' and
	    * 'LinkListeners'.
	    * @param e the event to be fired.
	    */
	   protected static synchronized void fireLinkUpdated(LinkEvent e) {
	      for (IServerListener listener : listeners) {
	         listener.linkUpdated(e);
	      }

	      for (LinkListener listener : linkListeners) {
	         listener.linkUpdated(e);
	      }

	   } // fireLinkUpdated


	   /**
	    * Forwards the given delete event to all registered 'iServerListeners' and
	    * 'LinkListeners'.
	    * @param e the event to be fired.
	    */
	   protected static synchronized void fireLinkDeleted(LinkEvent e) {
	      for (IServerListener listener : listeners) {
	         listener.linkDeleted(e);
	      }

	      for (LinkListener listener : linkListeners) {
	         listener.linkDeleted(e);
	      }

	   } // fireLinkDeleted


	   /**
	    * Forwards the given create event to all registered 'iServerListeners' and
	    * 'PreferenceListeners'.
	    * @param e the event to be fired.
	    */
	   protected static synchronized void firePreferenceCreated(ParameterEvent e) {
	      for (IServerListener listener : listeners) {
	         listener.preferenceCreated(e);
	      }

	      for (PreferenceListener listener : preferenceListeners) {
	         listener.preferenceCreated(e);
	      }

	   } // firePreferenceCreated


	   /**
	    * Forwards the given update event to all registered 'iServerListeners' and
	    * 'PreferenceListeners'.
	    * @param e the event to be fired.
	    */
	   protected static synchronized void firePreferenceUpdated(ParameterEvent e) {
	      for (IServerListener listener : listeners) {
	         listener.preferenceUpdated(e);
	      }

	      for (PreferenceListener listener : preferenceListeners) {
	         listener.preferenceUpdated(e);
	      }

	   } // firePreferenceUpdated


	   /**
	    * Forwards the given initialise event to all registered 'iServerListeners'
	    * and 'PreferenceListeners'.
	    * @param e the event to be fired.
	    */
	   protected static synchronized void firePreferenceInitialised(ParameterEvent e) {
	      for (IServerListener listener : listeners) {
	         listener.preferenceInitialised(e);
	      }

	      for (PreferenceListener listener : preferenceListeners) {
	         listener.preferenceInitialised(e);
	      }

	   } // firePreferenceInitialised


	   /**
	    * Forwards the given delete event to all registered 'iServerListeners' and
	    * 'PreferenceListeners'.
	    * @param e the event to be fired.
	    */
	   protected static synchronized void firePreferenceDeleted(ParameterEvent e) {
	      for (IServerListener listener : listeners) {
	         listener.preferenceDeleted(e);
	      }

	      for (PreferenceListener listener : preferenceListeners) {
	         listener.preferenceDeleted(e);
	      }

	   } // firePreferenceDeleted


	   /**
	    * Forwards the given create event to all registered 'iServerListeners' and
	    * 'ResourceListeners'.
	    * @param e the event to be fired.
	    */
	   protected static synchronized void fireResourceCreated(ResourceEvent e) {
	      for (IServerListener listener : listeners) {
	         listener.resourceCreated(e);
	      }

	      for (ResourceListener listener : resourceListeners) {
	         listener.resourceCreated(e);
	      }

	   } // fireResourceCreated


	   /**
	    * Forwards the given initialise event to all registered 'iServerListeners'
	    * and 'ResourceListeners'.
	    * @param e the event to be fired.
	    */
	   protected static synchronized void fireResourceInitialised(ResourceEvent e) {
	      for (IServerListener listener : listeners) {
	         listener.resourceInitialised(e);
	      }

	      for (ResourceListener listener : resourceListeners) {
	         listener.resourceInitialised(e);
	      }

	   } // fireResourceInitialised


	   /**
	    * Forwards the given update event to all registered 'iServerListeners' and
	    * 'ResourceListeners'.
	    * @param e the event to be fired.
	    */
	   protected static synchronized void fireResourceUpdated(ResourceEvent e) {
	      for (IServerListener listener : listeners) {
	         listener.resourceUpdated(e);
	      }

	      for (ResourceListener listener : resourceListeners) {
	         listener.resourceUpdated(e);
	      }

	   } // fireResourceUpdated


	   /**
	    * Forwards the given delete event to all registered 'iServerListeners' and
	    * 'ResourceListeners'.
	    * @param e the event to be fired.
	    */
	   protected static synchronized void fireResourceDeleted(ResourceEvent e) {
	      for (IServerListener listener : listeners) {
	         listener.resourceDeleted(e);
	      }

	      for (ResourceListener listener : resourceListeners) {
	         listener.resourceDeleted(e);
	      }

	   } // fireResourceDeleted


	   /**
	    * Forwards the given create event to all registered 'iServerListeners' and
	    * 'SelectorListeners'.
	    * @param e the event to be fired.
	    */
	   protected static synchronized void fireSelectorCreated(SelectorEvent e) {
	      for (IServerListener listener : listeners) {
	         listener.selectorCreated(e);
	      }

	      for (SelectorListener listener : selectorListeners) {
	         listener.selectorCreated(e);
	      }

	   } // fireSelectorCreated


	   /**
	    * Forwards the given initialise event to all registered 'iServerListeners'
	    * and 'SelectorListeners'.
	    * @param e the event to be fired.
	    */
	   protected static synchronized void fireSelectorInitialised(SelectorEvent e) {
	      for (IServerListener listener : listeners) {
	         listener.selectorInitialised(e);
	      }

	      for (SelectorListener listener : selectorListeners) {
	         listener.selectorInitialised(e);
	      }

	   } // fireSelectorInitialised


	   /**
	    * Forwards the given update event to all registered 'iServerListeners' and
	    * 'SelectorListeners'.
	    * @param e the event to be fired.
	    */
	   protected static synchronized void fireSelectorUpdated(SelectorEvent e) {
	      for (IServerListener listener : listeners) {
	         listener.selectorUpdated(e);
	      }

	      for (SelectorListener listener : selectorListeners) {
	         listener.selectorUpdated(e);
	      }

	   } // fireSelectorUpdated


	   /**
	    * Forwards the given delete event to all registered 'iServerListeners' and
	    * 'SelectorListeners'.
	    * @param e the event to be fired.
	    */
	   protected static synchronized void fireSelectorDeleted(SelectorEvent e) {
	      for (IServerListener listener : listeners) {
	         listener.selectorDeleted(e);
	      }

	      for (SelectorListener listener : selectorListeners) {
	         listener.selectorDeleted(e);
	      }

	   } // fireSelectorDeleted
}

