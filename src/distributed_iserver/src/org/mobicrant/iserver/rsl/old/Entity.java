/*
 * @(#)$Id: Entity.java 364 2009-07-21 23:43:37Z D\signerb $
 *
 * Author       :   Beat Signer, signer@inf.ethz.ch
 *
 * Purpose      :   Root object used for linking.
 *
 * -----------------------------------------------------------------------
 *
 * Revision Information:
 *
 * Date             Who         Reason
 *
 * Dec 19, 2002     bsigner     Initial Release
 * Aug 14, 2003     bsigner     Changed from Data to Entity
 * Dec 17, 2003     bsigner     Move properties from link level to entity level
 * Jan 05, 2004     bsigner     New associated EntityType
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

import static org.ximtec.iserver.util.Constant.ICON_PATH;

import java.util.Collection;
import java.util.HashSet;
import java.util.Iterator;

import javax.swing.ImageIcon;

import org.sigtec.graphix.IconTool;
import org.sigtec.om.util.Polymorphism;
import org.sigtec.util.Constant;
import org.sigtec.util.Decorator;
import org.sigtec.util.InstanceInfo;
import org.xdatabase.om.OMAssociation;
import org.xdatabase.om.OMBinObject;
import org.xdatabase.om.OMCollection;
import org.xdatabase.om.OMInstance;
import org.xdatabase.om.OMIterator;
import org.xdatabase.om.workspace.OMSInstance;
import org.ximtec.iserver.event.PropertyAddRemoveEvent;
import org.ximtec.iserver.event.UserAddRemoveEvent;
import org.ximtec.iserver.util.Property;


/**
 * Root object used for linking.
 * @version 1.0 Dec 2002
 * @author Beat Signer, signer@inf.ethz.ch
 */
public class Entity extends OMSInstance implements Decorator {

   private static final String ICON_NAME = ICON_PATH + "entity";

   private static final String TOOLTIP = "An entity is the common supertype of all links, resources and selectors.";

   private static final String ATTRIBUTE_PROPERTIES = "properties";


   /**
    * Sets the name of the entity.
    * @param name the entity's name.
    */
   public synchronized void setName(String name) {
      this.setAttributeValue(Schema.ENTITY_NAME, name, false);
   } // setName


   /**
    * Returns the entity's name.
    * @return the entity's name.
    */
   public synchronized String getName() {
      return (String)this.getAttributeValue(Schema.ENTITY_NAME, false);
   } // getName


   /**
    * Sets the entity's creator. If the entity is already associated with an
    * individual, the corresponding association will be removed.
    * @param individual the entity's creator.
    */
   public synchronized void setCreator(Individual individual) {
      OMAssociation createdBy = IServer.associationCreatedBy();
      createdBy.remove(new Object[] { this, null });
      createdBy.add(this, individual);
   } // setCreator


   /**
    * Returns the entity's creator.
    * @return the entity's creator.
    */
   public Individual getCreator() {
      return (Individual)IServer.associationCreatedBy().dr(this).range()
            .getFirstInstance();
   } // getCreator


   /**
    * Returns true if the specified individual is the creator of the entity.
    * @param individual the individual to be checked for.
    * @return true if the specified individual is the creator of the entity.
    */
   public boolean isCreator(Individual individual) {
      return getCreator().equals(individual);
   } // isCreator


   /**
    * Adds a new user to the list of users authorised to access this entity (adds
    * user to the association 'AccessibleTo').
    * @param user the user to be added to the list of authorised users.
    * @return true if the user has been added and was not yet an authorised user.
    */
   public boolean addAuthorisedUser(User user) {
      boolean result = IServer.associationAccessibleTo().add(this, user);
      IServer.fireAuthorisedUserAdded(new UserAddRemoveEvent(this, user));
      return result;
   } // addAuthorisedUser


   /**
    * Removes a user from the list of users authorised to access this entity
    * (removes user from the association 'AccessibleTo').
    * @param user the user to be removed from the list of authorised users.
    * @return true if the user has been authorised and is removed now.
    */
   public boolean removeAuthorisedUser(User user) {
      boolean result = IServer.associationAccessibleTo().remove(this, user);
      IServer.fireAuthorisedUserRemoved(new UserAddRemoveEvent(this, user));
      return result;
   } // removeAuthorisedUser


   /**
    * Returns all users (individuals and groups) having access to this entity
    * (recursive).
    * @return all users (individuals and groups) having access to this entity.
    */
   public OMCollection getAuthorisedUsers() {
      OMCollection result = getBaseObject().getWorkspace().createCollection(
            null, OMCollection.SET, Schema.TYPE_USER);

      for (OMIterator instances = IServer.associationAccessibleTo().dr(this)
            .range().instances(); instances.hasNext();) {
         OMInstance currentUser = (OMInstance)instances.next();
         currentUser = Polymorphism.getLeafInstance(currentUser);

         if (currentUser instanceof Individual) {
            result.add(currentUser);
         }
         else if (currentUser instanceof Group) {
            result.addAll(((Group)currentUser).getMembers());
         }

      }

      return result;
   } // getAuthorisedUsers


   /**
    * Returns all users (individuals and groups) having access to this entity
    * (recursive).
    * @return all users (individuals and groups) having access to this entity.
    */
   public OMCollection getAuthorisedUsersFlat() {
      OMCollection result = getBaseObject().getWorkspace().createCollection(
            null, OMCollection.SET, Schema.TYPE_USER);

      for (OMIterator instances = IServer.associationAccessibleTo().dr(this)
            .range().instances(); instances.hasNext();) {
         OMInstance currentUser = (OMInstance)instances.next();
         currentUser = Polymorphism.getLeafInstance(currentUser);

         if (currentUser instanceof Individual) {
            result.add(currentUser);
         }
         else if (currentUser instanceof Group) {
            result.add(currentUser);
         }

      }

      return result;
   } // getAuthorisedUsersFlat


   /**
    * Returns all individuals (root level only) having access to this entity.
    * @return all individuals (root level only) having access to this entity.
    */
   public OMCollection getAuthorisedIndividuals() {
      return IServer.associationAccessibleTo().dr(this).rr(
            IServer.collectionIndividuals());
   } // getAuthorisedIndividuals


   /**
    * Adds a new user to the list of users unauthorised to access this entity
    * (adds user to the association 'InaccessibleTo').
    * @param user the user to be added to the list of unauthorised users.
    * @return true if the user has been added and was not yet an unauthorised
    *         user.
    */
   public boolean addUnauthorisedUser(User user) {
      boolean result = IServer.associationInaccessibleTo().add(this, user);
      IServer.fireUnauthorisedUserAdded(new UserAddRemoveEvent(this, user));
      return result;
   } // addUnauthorisedUser


   /**
    * Removes a user from the list of users unauthorised to access this entity
    * (removes user from the association 'InaccessibleTo').
    * @param user the user to be removed from the list of unauthorised users.
    * @return true if the user has been unauthorised and is removed now.
    */
   public boolean removeUnauthorisedUser(User user) {
      boolean result = IServer.associationInaccessibleTo().remove(this, user);
      IServer.fireUnauthorisedUserRemoved(new UserAddRemoveEvent(this, user));
      return result;
   } // removeUnauthorisedUser


   /**
    * Returns all users (individuals and groups) not having access to this entity
    * (recursive).
    * @return all users (individuals and groups) not having access to this
    *         entity.
    */
   public OMCollection getUnauthorisedUsers() {
      OMCollection result = getBaseObject().getWorkspace().createCollection(
            null, OMCollection.SET, Schema.TYPE_USER);

      for (OMIterator instances = IServer.associationInaccessibleTo().dr(this)
            .range().instances(); instances.hasNext();) {
         OMInstance currentUser = (OMInstance)instances.next();
         currentUser = Polymorphism.getLeafInstance(currentUser);

         if (currentUser instanceof Individual) {
            result.add(currentUser);
         }
         else if (currentUser instanceof Group) {
            result.addAll(((Group)currentUser).getMembers());
         }

      }

      return result;
   } // getUnauthorisedUsers


   /**
    * Returns all users (individuals and groups) not having access to this entity
    * (recursive).
    * @return all users (individuals and groups) not having access to this
    *         entity.
    */
   public OMCollection getUnauthorisedUsersFlat() {
      OMCollection result = getBaseObject().getWorkspace().createCollection(
            null, OMCollection.SET, Schema.TYPE_USER);

      for (OMIterator instances = IServer.associationInaccessibleTo().dr(this)
            .range().instances(); instances.hasNext();) {
         OMInstance currentUser = (OMInstance)instances.next();
         currentUser = Polymorphism.getLeafInstance(currentUser);

         if (currentUser instanceof Individual) {
            result.add(currentUser);
         }
         else if (currentUser instanceof Group) {
            result.add(currentUser);
         }

      }

      return result;
   }


   public Collection<Property> getProperty() {
      Collection<Property> result = new HashSet<Property>();
      OMCollection property = (OMCollection)getAttributeValue(ATTRIBUTE_PROPERTIES);
      
      for (Iterator properties = property.iterator(); properties.hasNext();) {
         OMBinObject p = (OMBinObject)properties.next();
         result.add(new Property((String)p.getSource(), (String)p.getTarget()));

      }

      return result;
   } // getProperty


   public boolean addProperty(Property property) {
      return addProperty(property.getKey(), property.getValue());
   } // addProperty


   /**
    * Adds a property to the entity.
    * @param key the key of the property to be added.
    * @param value the value of the property to be added.
    * @return if the property has been added and did not exist before.
    */
   public boolean addProperty(String key, String value) {
      removeProperty(key);
      OMBinObject property = this.getWorkspace().createBinObject(key, value);
      boolean result = ((OMCollection)getAttributeValue(ATTRIBUTE_PROPERTIES))
            .add(property);
      IServer.firePropertyAdded(new PropertyAddRemoveEvent(this, new Property(
            key, value)));
      return result;
   } // addProperty


   /**
    * Removes a property from the entity.
    * @param key the key of the property to be removed.
    * @return true if the property existed and has been removed now.
    */
   public boolean removeProperty(String key) {
      OMBinObject property = getPropertyObject(key);

      if (property != null) {
         String value = getProperty(key);
         boolean result = ((OMCollection)getAttributeValue(ATTRIBUTE_PROPERTIES))
               .remove(property);
         IServer.firePropertyRemoved(new PropertyAddRemoveEvent(this,
               new Property(key, value)));
         return result;
      }
      else {
         return false;
      }

   } // removeProperty


   /**
    * Returns the value of the specified property.
    * @param key the key of the property whose value has to be returned.
    * @return value of the specified property or null if the property is
    *         undefined.
    */
   public String getProperty(String key) {
      OMBinObject property = getPropertyObject(key);

      if (property != null) {
         return (String)property.getTarget();
      }
      else {
         return null;
      }

   } // getProperty


   private OMBinObject getPropertyObject(String key) {
      OMCollection property = (OMCollection)getAttributeValue(ATTRIBUTE_PROPERTIES);

      for (Iterator properties = property.iterator(); properties.hasNext();) {
         OMBinObject p = (OMBinObject)properties.next();
         String propertyKey = (String)p.getSource();

         if (propertyKey.equals(key)) {
            return p;
         }

      }

      return null;
   } // getPropertyObject


   /**
    * Returns true if the entity is accessible to the specified user.
    * @param user the user to be checked for.
    * @return true if the entity is accessible to the specified user.
    */
   public boolean isAccessibleTo(User user) {
      OMCollection result = getBaseObject().getWorkspace().createCollection(
            null, OMCollection.SET, Schema.TYPE_USER);
      result.addAll(getAuthorisedUsers());
      result.removeAll(getUnauthorisedUsers());
      result.addAll(getAuthorisedIndividuals());
      return result.contains(user);
   } // isAccessibleTo


   /**
    * Returns all sources of links having this entity as link target.
    * @return all sources of links having this entity as link target.
    */
   public OMCollection sources() {
      return IServer.associationHasSource().dr(Link.getLinkByTarget(this))
            .range();
   } // sources


   /**
    * Returns the type of the entity.
    * @return the entity's type.
    */
   public String getType() {
      return org.ximtec.iserver.plugin.Type.UNKNOWN;
   } // getType


   /**
    * Returns the string to be used to label this object.
    * @return string to be used to label this object.
    */
   @Override
   public synchronized String getLabelExtension() {
      return (getName() != null) ? getName() : Constant.EMPTY_STRING;
   } // getLabelExtension


   /**
    * Returns the entity's label (description).
    * @return label (description) of the entity.
    */
   public String getLabel() {
      return getName();
   } // getLabel


   /**
    * Returns an icon for the object.
    * @param size the size of the icon to be returned (16, 24 or 32 pixels). Use
    *           the SIZE constants defined in the Decorator interface for
    *           choosing the size.
    * @return icon for the object.
    */
   public ImageIcon getIcon(int size) {
      return IconTool.getIcon(ICON_NAME, size);
   } // getIcon


   /**
    * Returns a tooltip for the entity.
    * @return the entity's tooltip.
    */
   public String getTooltip() {
      return TOOLTIP;
   } // getTooltip


   /**
    * Returns a string representation of the entity's content.
    * @return string representation of the entity's content.
    */
   @Override
   public String toString() {
      InstanceInfo info = new InstanceInfo(this);
      info.addAttribute(Schema.ENTITY_NAME, getName());
      return info.toString();
   } // toString

}