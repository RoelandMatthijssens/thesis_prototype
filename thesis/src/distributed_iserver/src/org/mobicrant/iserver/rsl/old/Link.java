/*
 * @(#)$Id: Link.java 364 2009-07-21 23:43:37Z D\signerb $
 *
 * Author       :   Beat Signer, signer@inf.ethz.ch
 *
 * Purpose      :   Link from one or more sources to one or more targets.
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
import org.sigtec.util.Constant;
import org.sigtec.util.InstanceInfo;
import org.xdatabase.om.OMCollection;
import org.ximtec.iserver.event.LinkEvent;
import org.ximtec.iserver.util.Property;


/**
 * Link from one or more sources to one or more targets.
 * @version 1.0 Dec 2002
 * @author Beat Signer, signer@inf.ethz.ch
 */
public class Link extends Entity {

   private static final String SOURCE_SIZE = "sourceSize";
   private static final String TARGET_SIZE = "targetSize";

   private static final String ICON_NAME = ICON_PATH + "link";

   private static final String TOOLTIP = "A link referencing two or more entities.";


   @Override
   public synchronized void setName(String name) {
      super.setName(name);
      IServer.fireLinkUpdated(new LinkEvent(this));
   } // setName


   @Override
   public synchronized void setCreator(Individual individual) {
      super.setCreator(individual);
      IServer.fireLinkUpdated(new LinkEvent(this));
   } // setCreator


   @Override
   public boolean addAuthorisedUser(User user) {
      boolean result = super.addAuthorisedUser(user);
      IServer.fireLinkUpdated(new LinkEvent(this));
      return result;
   } // addAuthorisedUser


   @Override
   public boolean removeAuthorisedUser(User user) {
      boolean result = super.removeAuthorisedUser(user);
      IServer.fireLinkUpdated(new LinkEvent(this));
      return result;
   } // removeAuthorisedUser


   @Override
   public boolean addUnauthorisedUser(User user) {
      boolean result = super.addUnauthorisedUser(user);
      IServer.fireLinkUpdated(new LinkEvent(this));
      return result;
   } // addUnauthorisedUser


   @Override
   public boolean removeUnauthorisedUser(User user) {
      boolean result = super.removeUnauthorisedUser(user);
      IServer.fireLinkUpdated(new LinkEvent(this));
      return result;
   } // removeUnauthorisedUser


   @Override
   public boolean addProperty(String key, String value) {
      boolean result = super.addProperty(key, value);
      IServer.fireLinkUpdated(new LinkEvent(this));
      return result;
   } // addProperty


   @Override
   public boolean addProperty(Property property) {
      boolean result = super.addProperty(property);
      IServer.fireLinkUpdated(new LinkEvent(this));
      return result;
   } // addProperty


   public boolean removePropertyOld(String key) {
      boolean result = super.removeProperty(key);
      IServer.fireLinkUpdated(new LinkEvent(this));
      return result;
   } // removeProperty


   /**
    * Adds a source to the link.
    * @param source the source to be added.
    * @return true if the source has been added and not yet been part of the
    *         link.
    */
   public boolean addSource(Entity source) {
      boolean result = IServer.associationHasSource().add(this, source);
      IServer.fireLinkUpdated(new LinkEvent(this));
      return result;
   } // addSource


   /**
    * Removes a source from the link.
    * @param source the source to be removed from the link.
    * @return true if the source has been part of and removed from the link.
    */
   public boolean removeSource(Entity source) {
      boolean result = IServer.associationHasSource().remove(this, source);
      IServer.fireLinkUpdated(new LinkEvent(this));
      return result;
   } // removeSource


   /**
    * Returns the link's source.
    * @return the link's source.
    */
   public OMCollection getSource() {
      return IServer.associationHasSource().dr(this).range();
   } // getSource


   /**
    * Adds a target to the link.
    * @param target the target to be added to the link.
    * @return true if the target has been added and not yet been part of the
    *         link.
    */
   public boolean addTarget(Entity target) {
      boolean result = IServer.associationHasTarget().add(this, target);
      IServer.fireLinkUpdated(new LinkEvent(this));
      return result;
   } // addTarget


   /**
    * Removes a target from the link.
    * @param target the target to be removed from the link.
    * @return true if the target has been part of and removed from the link.
    */
   public boolean removeTarget(Entity target) {
      boolean result = IServer.associationHasTarget().remove(this, target);
      IServer.fireLinkUpdated(new LinkEvent(this));
      return result;
   } // removeTarget


   /**
    * Returns the link's target.
    * @return the link's target.
    */
   public OMCollection getTarget() {
      return IServer.associationHasTarget().dr(this).range();
   } // getTarget


   /**
    * Returns all links having a specific data object as source.
    * @param source the source object whose links have to be returned.
    * @return all links having the specified object as source.
    */
   public static OMCollection getLinkBySource(Entity source) {
      return IServer.associationHasSource().rr(source).domain();
   } // getLinkBySource


   /**
    * Returns all links having a specific data object as target.
    * @param target the target object whose links have to be returned.
    * @return all links having the specified object as target.
    */
   public static OMCollection getLinkByTarget(Entity target) {
      return IServer.associationHasTarget().rr(target).domain();
   } // getLinkByTarget


   /**
    * Returns the string to be used to label this object.
    * @return string to be used to label this object.
    */
   @Override
   public synchronized String getLabelExtension() {
      int sourceSize = (getSource() != null) ? 1 : 0;
      int targetSize = (getTarget() != null) ? getTarget().size() : 0;
      String prefix = (!super.getLabelExtension().equals(Constant.EMPTY_STRING)) ? super
            .getLabelExtension()
            : Schema.TYPE_LINK;
      return prefix + Constant.BLANK + Constant.OPEN_PARENTHESIS + sourceSize
            + Constant.COMMA + Constant.BLANK + targetSize
            + Constant.CLOSE_PARENTHESIS;
   } // getLabelExtension


   /**
    * Returns an icon for the link.
    * @param size the size of the icon to be returned (16, 24 or 32 pixels). Use
    *           the SIZE constants defined in the Decorator interface for
    *           choosing the size.
    * @return icon for the link.
    */
   @Override
   public ImageIcon getIcon(int size) {
      return IconTool.getIcon(ICON_NAME, size);
   } // getIcon


   /**
    * Returns a tooltip for the link.
    * @return the link's tooltip.
    */
   @Override
   public String getTooltip() {
      return TOOLTIP;
   } // getTooltip


   /**
    * Returns a string representation of the link's content.
    * @return string representation of the link's content.
    */
   @Override
   public String toString() {
      int sourceSize = (getSource() != null) ? getSource().size() : 0;
      int targetSize = (getTarget() != null) ? getTarget().size() : 0;
      InstanceInfo info = new InstanceInfo(this);
      info.add(super.toString());
      info.add(Constant.COMMA_BLANK);
      info.addAttribute(SOURCE_SIZE, sourceSize);
      info.addAttribute(TARGET_SIZE, targetSize);
      return info.toString();
   } // toString

}