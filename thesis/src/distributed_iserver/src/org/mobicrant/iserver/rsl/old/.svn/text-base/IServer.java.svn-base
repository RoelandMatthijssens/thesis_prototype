/*
 * @(#)$Id: IServer.java 364 2009-07-21 23:43:37Z D\signerb $
 *
 * Author       :   Beat Signer, signer@inf.ethz.ch
 *
 * Purpose      :   Root iServer class providing access to data and
 *                  enabling object creation.
 *
 * -----------------------------------------------------------------------
 *
 * Revision Information:
 *
 * Date             Who         Reason
 *
 * Dec 20, 2002     bsigner     Initial Release
 * Jul 11, 2006     bsigner     Added new events for group handling
 * Jul 11, 2006     bsigner     Changed position of all delete events
 * Aug 11, 2006     bsigner     Added template mechanism
 * Nov 21, 2006     bsigner     Added addToResources and addToSelectors
 *
 * -----------------------------------------------------------------------
 *
 * Copyright 1999-2009 ETH Zurich. All Rights Reserved.
 *
 * This software is the proprietary information of ETH Zurich.
 * Use is subject to license terms.
 * 
 */


package org.mobicrant.iserver.rsl.old;

import java.util.HashSet;

import org.sigtec.om.util.Database;
import org.sigtec.om.util.Operator;
import org.sigtec.om.util.Polymorphism;
import org.xdatabase.om.OMAssociation;
import org.xdatabase.om.OMCollection;
import org.xdatabase.om.OMInstance;
import org.xdatabase.om.OMIterator;
import org.xdatabase.om.OMObject;
import org.xdatabase.om.OMWorkspace;
import org.xdatabase.om.basetype.OMMime;
import org.ximtec.iserver.core.resource.Schema;
import org.ximtec.iserver.event.EntityListener;
import org.ximtec.iserver.event.GroupEvent;
import org.ximtec.iserver.event.IServerListener;
import org.ximtec.iserver.event.LayerEvent;
import org.ximtec.iserver.event.LayerListener;
import org.ximtec.iserver.event.LinkEvent;
import org.ximtec.iserver.event.LinkListener;
import org.ximtec.iserver.event.ParameterAddRemoveEvent;
import org.ximtec.iserver.event.ParameterEvent;
import org.ximtec.iserver.event.PreferenceListener;
import org.ximtec.iserver.event.PropertyAddRemoveEvent;
import org.ximtec.iserver.event.ResourceEvent;
import org.ximtec.iserver.event.ResourceListener;
import org.ximtec.iserver.event.SelectorEvent;
import org.ximtec.iserver.event.SelectorListener;
import org.ximtec.iserver.event.UserAddRemoveEvent;
import org.ximtec.iserver.event.UserEvent;
import org.ximtec.iserver.event.UserListener;


/**
 * Root iServer class providing access to data and enabling object creation.
 * @version 1.0 Dec 2002
 * @author Beat Signer, signer@inf.ethz.ch
 */
public class IServer {

   private static HashSet<IServerListener> listeners = new HashSet<IServerListener>();

   private static HashSet<EntityListener> entityListeners = new HashSet<EntityListener>();

   private static HashSet<UserListener> userListeners = new HashSet<UserListener>();

   private static HashSet<LayerListener> layerListeners = new HashSet<LayerListener>();

   private static HashSet<LinkListener> linkListeners = new HashSet<LinkListener>();

   private static HashSet<PreferenceListener> preferenceListeners = new HashSet<PreferenceListener>();

   private static HashSet<ResourceListener> resourceListeners = new HashSet<ResourceListener>();

   private static HashSet<SelectorListener> selectorListeners = new HashSet<SelectorListener>();


   protected static OMWorkspace getWorkspace() {
      return Database.getWorkspace();
   } // getWorkspace


   public static OMCollection collectionActiveLayers() {
      return getWorkspace().getCollection(Schema.COLLECTION_ACTIVE_LAYERS);
   } // collectionActiveLayer


   public static OMCollection collectionContainers() {
      return getWorkspace().getCollection(Schema.COLLECTION_CONTAINERS);
   } // collectionContainers


   public static OMCollection collectionEntities() {
      return getWorkspace().getCollection(Schema.COLLECTION_ENTITIES);
   } // collectionEntities


   public static OMCollection collectionEntityTypes() {
      return getWorkspace().getCollection(Schema.COLLECTION_ENTITY_TYPES);
   } // collectionEntityTypes


   public static OMCollection collectionGroups() {
      return getWorkspace().getCollection(Schema.COLLECTION_GROUPS);
   } // collectionActiveLayer


   public static OMCollection collectionImages() {
      return getWorkspace().getCollection(Schema.COLLECTION_IMAGES);
   } // collectionImages


   public static OMCollection collectionIndividuals() {
      return getWorkspace().getCollection(Schema.COLLECTION_INDIVIDUALS);
   } // collectionIndividuals


   public static OMCollection collectionLayers() {
      return getWorkspace().getCollection(Schema.COLLECTION_LAYERS);
   } // collectionLayers


   public static OMCollection collectionLinks() {
      return getWorkspace().getCollection(Schema.COLLECTION_LINKS);
   } // collectionLinks


   public static OMCollection collectionMedia() {
      return getWorkspace().getCollection(Schema.COLLECTION_MEDIA);
   } // collectionMedia


   public static OMCollection collectionMovies() {
      return getWorkspace().getCollection(Schema.COLLECTION_MOVIES);
   } // collectionMovies


   public static OMCollection collectionPreferences() {
      return getWorkspace().getCollection(Schema.COLLECTION_PREFERENCES);
   } // collectionPreferences


   public static OMCollection collectionResources() {
      return getWorkspace().getCollection(Schema.COLLECTION_RESOURCES);
   } // collectionResources


   public static OMCollection collectionSelectors() {
      return getWorkspace().getCollection(Schema.COLLECTION_SELECTORS);
   } // collectionSelectors


   public static OMCollection collectionTemplates() {
      return getWorkspace().getCollection(Schema.COLLECTION_TEMPLATES);
   } // collectionTemplates


   public static OMCollection collectionTexts() {
      return getWorkspace().getCollection(Schema.COLLECTION_TEXTS);
   } // collectionTexts


   public static OMCollection collectionUsers() {
      return getWorkspace().getCollection(Schema.COLLECTION_USERS);
   } // collectionUsers


   public static OMCollection collectionWebpages() {
      return getWorkspace().getCollection(Schema.COLLECTION_WEBPAGES);
   } // collectionWebpages


   public static OMAssociation associationAccessibleTo() {
      return getWorkspace().getAssociation(Schema.ASSOCIATION_ACCESSIBLE_TO);
   } // associationAccessibleTo


   public static OMAssociation associationContains() {
      return getWorkspace().getAssociation(Schema.ASSOCIATION_CONTAINS);
   } // associationContains


   public static OMAssociation associationCreatedBy() {
      return getWorkspace().getAssociation(Schema.ASSOCIATION_CREATED_BY);
   } // associationCreatedBy


   public static OMAssociation associationHasCeator() {
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


   /**
    * Adds the specified resource to the collections 'Resources' and 'Entities'.
    * @param resource the resource to be added to the collections.
    */
   public static void addToResources(Object resource) {
      collectionResources().add(resource);
      collectionEntities().add(resource);
   } // addToResources


   /**
    * Adds the specified selector to the collections 'Selectors' and 'Entities'.
    * @param selector the selector to be added to the collections.
    */
   public static void addToSelectors(Object selector) {
      collectionSelectors().add(selector);
      collectionEntities().add(selector);
   } // addToSelectors


   /**
    * Returns the user with the specified name.
    * @param name the name of the user that has to be returned.
    * @return the user with the specified name.
    */
   public static User getUser(String name) {
      return (User)IServer.collectionUsers().select(Schema.USER_NAME,
            Operator.EQUAL, name).getFirstInstance();
   } // getUser


   /**
    * Creates a new group instance and adds it to the collections 'Groups' and
    * 'Users'.
    * @param name the name of the group instance.
    * @param description the description of the group instance.
    * @return the new group instance.
    */
   public static Group createGroup(String name, String description) {
      User user = IServerInstanceManager.createUser(name, description);
      Group group = IServerInstanceManager.dressGroup(user);
      collectionGroups().add(group);
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


   /**
    * Deletes a group and removes it from the collections 'Groups' and 'Users'
    * and from the associations 'HasMembers', 'HasPreferences' and 'AccessibleTo'
    * and 'InaccessibleTo'. The parameter recursive defines if the members of
    * the group (individuals or groups) should be deleted recursively.
    * @param group the group to be deleted.
    * @param recursive true if all members should be deleted recursively.
    */
   public static void deleteGroup(Group group, boolean recursive) {
      if (recursive) {

         for (OMIterator members = group.getDirectMembers().instances(); members
               .hasNext();) {
            OMInstance leafInstance = Polymorphism.getLeafInstance(members
                  .nextInstance());

            if (leafInstance instanceof Group) {
               deleteGroup((Group)leafInstance, true);
            }
            else if (leafInstance instanceof User) {
               IServerInstanceManager.deleteUser((User)leafInstance);
            }

         }

      }

      collectionGroups().remove(group);
      associationHasMembers().remove(new Object[] { group, null });
      IServerInstanceManager.deleteUser(group);
   } // deleteGroup


   /**
    * Returns the group with the specified name.
    * @param name the name of the group which has to be returned.
    * @return the group with the specified name.
    */
   public static Group getGroup(String name) {
      return (Group)IServer.collectionGroups().select(Schema.USER_NAME,
            Operator.EQUAL, name).getFirstInstance();
   } // getGroup


   /**
    * Creates a new individual instance and adds it to the collections
    * 'Individuals' and 'Users'.
    * @param name the name of the individual instance.
    * @param description the description of the individual instance.
    * @param login the login of the individual instance.
    * @param password the password of the individual instance.
    * @return the new individual instance.
    */
   public static Individual createIndividual(String name, String description,
         String login, String password) {
      User user = IServerInstanceManager.createUser(name, description);
      Individual individual = IServerInstanceManager.dressIndividual(user,
            login, password);
      collectionIndividuals().add(individual);
      fireUserInitialised(new UserEvent(individual));
      return individual;
   } // createIndividual


   /**
    * Deletes an individual and removes it from the collections 'Individuals' and
    * 'Users' and from the associations 'AccessibleTo', 'InaccesibleTo',
    * 'CreatedBy', 'HasPreferences' and 'HasMembers'.
    * @param individual the individual to be deleted.
    */
   public static void deleteIndividual(Individual individual) {
      collectionIndividuals().remove(individual);
      associationCreatedBy().remove(new Object[] { null, individual });
      IServerInstanceManager.deleteUser(individual);
   } // deleteIndividual


   /**
    * Returns the individual with the specified name.
    * @param name the name of the individual which has to be returned.
    * @return the individual with the specified name.
    */
   public static Individual getIndividual(String name) {
      return (Individual)IServer.collectionIndividuals().select(
            Schema.USER_NAME, Operator.EQUAL, name).getFirstInstance();
   } // getIndividual


   /**
    * Creates a new layer instance and adds it to the collections 'Layers'.
    * @param name the name of the layer instance.
    * @return the new layer instance.
    */
   public static Layer createLayer(String name) {
      OMObject object = getWorkspace().createObject(null);
      Layer layer = IServerInstanceManager.createLayerInstance(object, name);
      collectionLayers().add(layer);
      collectionActiveLayers().add(layer);
      IServer.fireLayerInitialised(new LayerEvent(layer));
      return layer;
   } // createLayer


   /**
    * Creates a new layer instance and adds it to the collection 'Layers' at the
    * specified position.
    * @param name the name of the layer instance.
    * @param position the position where the layer has to be added.
    * @return the new layer instance.
    */
   public static Layer createLayer(String name, int position) {
      OMObject object = getWorkspace().createObject(null);
      Layer layer = IServerInstanceManager.createLayerInstance(object, name);
      collectionLayers().add(position, layer.getBaseObject());
      collectionActiveLayers().add(layer);
      IServer.fireLayerInitialised(new LayerEvent(layer));
      return layer;
   } // createLayer


   /**
    * Deletes a layer and removes it from the collections 'Layers' and
    * 'ActiveLayers' and from the association 'OnLayer'.
    * @param layer the layer to be deleted.
    */
   public static void deleteLayer(Layer layer) {
      IServer.fireLayerDeleted(new LayerEvent(layer));
      collectionLayers().remove(layer);
      collectionActiveLayers().remove(layer);
      associationOnLayer().remove(new Object[] { layer, null });
      getWorkspace().deleteObject(layer.getBaseObject());
   } // deleteLayer


   /**
    * Returns the layer with the specified name.
    * @param name the name of the layer which has to be returned.
    * @return the layer with the specified name.
    */
   public static Layer getLayer(String name) {
      return (Layer)IServer.collectionLayers().select(Schema.LAYER_NAME,
            Operator.EQUAL, name).getFirstInstance();
   } // getLayer


   /**
    * Creates a new link instance and adds it to the collections 'Links' and
    * 'Entities'. Further the new link is associated with the specified source,
    * target and creator.
    * @param name the name of the link instance.
    * @param source the source of the link instance.
    * @param target the target of the link instance.
    * @param creator the creator of the link instance.
    * @return the new link instance.
    */
   public static Link createLink(String name, Entity source, Entity target,
         Individual creator) {
      Entity entity = IServerInstanceManager.createEntity(name, creator);
      Link link = IServerInstanceManager.dressLink(entity);
      collectionLinks().add(link);
      link.addSource(source);
      link.addTarget(target);
      link.setCreator(creator);
      fireLinkInitialised(new LinkEvent(link));
      return link;
   } // createLink


   /**
    * Deletes a link and removes it from the collections 'Links' and 'Entities'
    * and from the associations 'HasProperties', 'HasSource', 'HasTarget'
    * 'CreatedBy', 'AccessibleTo', 'InaccessibleTo' and HayType. Further, all
    * associated properties will be deleted.
    * @param link the link to be deleted.
    */
   public static void deleteLink(Link link) {
      IServer.fireLinkDeleted(new LinkEvent(link));
      collectionLinks().remove(link);
      associationHasSource().remove(new Object[] { link, null });
      associationHasTarget().remove(new Object[] { link, null });
      IServerInstanceManager.deleteEntity(link);
   } // deleteLink


   /**
    * Creates a new medium instance and adds it to the collections 'Media',
    * 'Resources' and 'Entities'.
    * @param name the name of the medium instance.
    * @param description the description of the medium instance.
    * @param content the content of the medium instance.
    * @param creator the creator of the medium.
    * @return the new medium instance.
    */
   public static Medium createMedium(String name, String description,
         OMMime content, Individual creator) {
      Resource resource = createResource(name, creator);
      Medium medium = IServerInstanceManager.dressMedium(resource, description,
            content);
      collectionMedia().add(medium);
      return medium;
   } // createMedium


   public static Medium createImage(String name, String description, String url,
         Individual creator) {
      OMMime mime = (OMMime)getWorkspace().createBaseTypeInstance(
            Schema.TYPE_MIME, url);
      Medium medium = createMedium(name, description, mime, creator);
      collectionImages().add(medium);
      return medium;
   } // createImage


   /**
    * Creates a new movie instance and adds it to the collections 'Movies',
    * 'Media', 'Resources' and Entities.
    * @param name the name of the movie.
    * @param description the description of the movie.
    * @param url the URL where to movie is stored.
    * @param creator the creator of the movie.
    * @return the new movie instance.
    */
   public static Medium createMovie(String name, String description, String url,
         Individual creator) {
      OMMime mime = (OMMime)getWorkspace().createBaseTypeInstance(
            Schema.TYPE_MIME, url);
      Medium medium = createMedium(name, description, mime, creator);
      collectionMovies().add(medium);
      return medium;
   } // createMovie


   /**
    * Creates a new webpage and adds it to the collections 'Webpages', 'Media',
    * 'Resources' and 'Entities'.
    * @param name the name of the web page.
    * @param description the description of the web page.
    * @param url the URL where of the web page.
    * @param creator the creator of the webpage.
    * @return the new web page instance.
    */
   public static Medium createWebpage(String name, String description,
         String url, Individual creator) {
      OMMime mime = (OMMime)getWorkspace().createBaseTypeInstance(
            Schema.TYPE_MIME, url);
      Medium medium = createMedium(name, description, mime, creator);
      collectionWebpages().add(medium);
      return medium;
   } // createWebpage


   /**
    * Creates a new parameter instance and adds it to the collection
    * 'Preferences'.
    * @param key the key of the parameter instance.
    * @param value the value of the parameter instance.
    * @return the new parameter instance.
    */
   public static Parameter createPreference(String key, String value) {
      OMObject object = getWorkspace().createObject(null);
      Parameter preference = IServerInstanceManager.createParameterInstance(
            object, key, value);
      firePreferenceCreated(new ParameterEvent(preference));
      collectionPreferences().add(preference);
      firePreferenceInitialised(new ParameterEvent(preference));
      return preference;
   } // createPreference


   /**
    * Deletes a preference and removes it from the collection 'Preferences' and
    * the association 'HasPreferences'.
    * @param preference the preference to be deleted.
    */
   public static void deletePreference(Parameter preference) {
      firePreferenceDeleted(new ParameterEvent(preference));
      collectionPreferences().remove(preference);
      associationHasPreferences().remove(new Object[] { null, preference });
      getWorkspace().deleteObject(preference.getBaseObject());
   } // deletePreference


   /**
    * Creates a new resource instance and adds it to the collections 'Resources'
    * and 'Entities'. Further the new resource is associated with the specified
    * creator.
    * @param name the name of the selector instance.
    * @param creator the creator of the link instance.
    * @return the new resource instance.
    */
   public static Resource createResource(String name, Individual creator) {
      Entity entity = IServerInstanceManager.createEntity(name, creator);
      Resource resource = IServerInstanceManager.dressResource(entity);
      collectionResources().add(resource);
      fireResourceInitialised(new ResourceEvent(resource));
      return resource;
   } // createResource


   /**
    * Deletes a resource instance and removes it from the collections 'Resources'
    * and 'Entities' and from the associations 'RefersTo', 'Contains',
    * 'HasSource', 'HasTarget', 'CreatedBy', 'AccessibleTo', 'InaccessibleTo',
    * 'HasType' and 'HasProperties'.
    * @param resource the resource instance to be deleted.
    */
   public static void deleteResource(Resource resource) {
      fireResourceDeleted(new ResourceEvent(resource));
      collectionResources().remove(resource);
      associationRefersTo().remove(new Object[] { null, resource });
      associationContains().remove(new Object[] { null, resource });
      IServerInstanceManager.deleteEntity(resource);
   } // deleteResource


   /**
    * Creates a new selector instance and adds it to the collections 'Selectors'
    * and 'Entities'. Further the new link is associated with the specified
    * layer, resource and creator.
    * @param name the name of the selector instance.
    * @param layer the layer of the link instance.
    * @param resource the resource of the link instance.
    * @param creator the creator of the link instance.
    * @return the new selector instance.
    */
   public static Selector createSelector(String name, Layer layer,
         Resource resource, Individual creator) {
      Entity entity = IServerInstanceManager.createEntity(name, creator);
      Selector selector = IServerInstanceManager.dressSelector(entity);
      collectionSelectors().add(selector);
      selector.setLayer(layer);
      resource.addSelector(selector);
      fireSelectorInitialised(new SelectorEvent(selector));
      return selector;
   } // createSelector


   /**
    * Deletes a selector and removes it from the collections 'Selectors' and
    * 'Entities' and from the associations 'OnLayer', 'RefersTo', 'HasSource',
    * 'HasTarget', 'CreatedBy', 'AccessibleTo' and 'InaccessibleTo'.
    * @param selector the selector to be deleted.
    */
   public static void deleteSelector(Selector selector) {
      fireSelectorDeleted(new SelectorEvent(selector));
      collectionSelectors().remove(selector);
      associationOnLayer().remove(new Object[] { selector, null });
      associationRefersTo().remove(new Object[] { selector, null });
      IServerInstanceManager.deleteEntity(selector);
   } // deleteSelector


   /**
    * Creates a new textComp instance and adds it to the collections 'Texts',
    * 'Resources' and 'Entities'.
    * @param name the name of the textComp instance.
    * @param content the textComp's content.
    * @param creator the creator of the textComp.
    * @return the new textComp instance.
    */
   public static TextComp createTextComp(String name, String content,
         Individual creator) {
      Resource resource = createResource(name, creator);
      TextComp textComp = IServerInstanceManager
            .dressTextComp(resource, content);
      collectionTexts().add(textComp);
      return textComp;
   } // createTextComp


   /**
    * Deletes a container (resource instance) and removes it from the collections
    * 'Containers', 'Resources' and 'Entities' and from the associations
    * 'RefersTo', 'Contains', 'HasSource', 'HasTarget', 'CreatedBy',
    * 'AccessibleTo' and 'InaccesibleTo'.
    * @param container the container instance to be deleted.
    */
   public static void deleteContainer(Resource container) {
      collectionContainers().remove(container);
      associationContains().remove(new Object[] { container, null });
      deleteResource(container);
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