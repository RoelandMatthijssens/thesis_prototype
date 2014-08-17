/*
 * @(#)$Id: User.java 364 2009-07-21 23:43:37Z D\signerb $
 *
 * Author       :   Beat Signer, signer@inf.ethz.ch
 *
 * Purpose      :   System user with specific preferences.
 *
 * -----------------------------------------------------------------------
 *
 * Revision Information:
 *
 * Date             Who         Reason
 *
 * Dec 19, 2002     bsigner     Initial Release
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

import javax.swing.ImageIcon;

import org.sigtec.graphix.IconTool;
import org.sigtec.om.util.Operator;
import org.sigtec.util.Constant;
import org.sigtec.util.Decorator;
import org.sigtec.util.InstanceInfo;
import org.xdatabase.om.OMCollection;
import org.xdatabase.om.workspace.OMSInstance;
import org.ximtec.iserver.event.ParameterAddRemoveEvent;
import org.ximtec.iserver.event.UserEvent;


/**
 * System user with specific preferences.
 * @version 1.0 Dec 2002
 * @author Beat Signer, signer@inf.ethz.ch
 */
public class User extends OMSInstance implements Decorator {

   private static final String ICON_NAME = ICON_PATH + "user";

   private static final String TOOLTIP = "A user is the common supertype of all groups and individuals.";


   /**
    * Sets the name of the user.
    * @param name the user's name.
    */
   public synchronized void setName(String name) {
      this.setAttributeValue(Schema.USER_NAME, name, false);
      IServer.fireUserUpdated(new UserEvent(this));
   } // setName


   /**
    * Returns the user's name.
    * @return the user's name.
    */
   public synchronized String getName() {
      return (String)this.getAttributeValue(Schema.USER_NAME, false);
   } // getName


   /**
    * Sets the description of the user.
    * @param description the user's description.
    */
   public synchronized void setDescription(String description) {
      this.setAttributeValue(Schema.USER_DESCRIPTION, description, false);
      IServer.fireUserUpdated(new UserEvent(this));
   } // setDescription


   /**
    * Returns the user's description.
    * @return the user's description.
    */
   public synchronized String getDescription() {
      return (String)this.getAttributeValue(Schema.USER_DESCRIPTION, false);
   } // getDescription


   /**
    * Returns all groups the user (individual or group) is a member of.
    * @return all groups the user is a member of.
    */
   public OMCollection memberOf() {
      return IServer.associationHasMembers().rr(this).domain();
   } // memberOf


   /**
    * Returns the users's preferences (collection of
    * org.ximtec.iserver.core.Parameter).
    * @return the users's preferences.
    */
   public OMCollection getPreferences() {
      return IServer.associationHasPreferences().dr(this).range();
   } // getPreferences

   
   /**
    * Adds a preference to the user.
    * @param name the name of the preference to be added.
    * @param value the value of the preference to be added.
    */
   public void addPreference(String name, String value) {
      Parameter preference = IServer.createPreference(name, value);
      addPreference(preference);
   } // addPreference


   /**
    * Adds a preference to the user.
    * @param parameter the parameter containing the information.
    */
   public void addPreference(Parameter parameter) {
      removePreference(parameter.getName());
      IServer.associationHasPreferences().add(this, parameter);
      IServer.firePreferenceAdded(new ParameterAddRemoveEvent(this, parameter));
   } // addPreference


   /**
    * Removes a preference from the user.
    * @param name the name of the preference to be removed.
    */
   public void removePreference(String name) {
      Parameter preference = getParameter(name);
      
      if (preference != null) {
         removePreference(preference);
      } 

   } // removePreference

   
   /**
    * Removes a preference from the user.
    * @param parameter the preference to be removed.
    */
   private void removePreference(Parameter parameter) {
      IServer.associationHasPreferences().remove(this, parameter);
      IServer.firePreferenceRemoved(new ParameterAddRemoveEvent(this, parameter));
      IServer.deletePreference(parameter);
   } // removePreference
   

   /**
    * Returns the value of the specified preference.
    * @param name the name of the preference whose value has to be returned.
    * @return value of the specified preference or null if the preference is
    *         undefined.
    */
   public String getPreference(String name) {
      Parameter preference = getParameter(name);
      return (preference != null) ? preference.getValue() : null;
   } // getPreference


   private Parameter getParameter(String name) {
      Parameter preference = (Parameter)getPreferences().select(
            org.sigtec.om.type.Schema.PARAMETER_NAME, Operator.EQUAL, name)
            .getFirstInstance();
      return preference;
   } // getParameter


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
    * Returns an icon for the user.
    * @param size the size of the icon to be returned (16, 24 or 32 pixels). Use
    *           the SIZE constants defined in the Decorator interface for
    *           choosing the size.
    * @return icon for the user.
    */
   public ImageIcon getIcon(int size) {
      return IconTool.getIcon(ICON_NAME, size);
   } // getIcon


   public String getTooltip() {
      return TOOLTIP;
   } // getTooltip


   /**
    * Returns a string representation of the user's content.
    * @return string representation of the user's content.
    */
   @Override
   public String toString() {
      InstanceInfo info = new InstanceInfo(this);
      info.addAttribute(Schema.USER_NAME, getName());
      info.addAttribute(Schema.USER_DESCRIPTION, getDescription());
      return info.toString();
   } // toString

}