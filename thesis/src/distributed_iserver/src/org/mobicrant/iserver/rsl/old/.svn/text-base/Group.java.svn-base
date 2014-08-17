/*
 * @(#)$Id: Group.java 364 2009-07-21 23:43:37Z D\signerb $
 *
 * Author       :   Beat Signer, signer@inf.ethz.ch
 *
 * Purpose      :   Collection of group members and subgroups which can
 *                  be used as a user within the system.
 *
 * -----------------------------------------------------------------------
 *
 * Revision Information:
 *
 * Date             Who         Reason
 *
 * Dec 26, 2002     bsigner     Initial Release
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
import org.xdatabase.om.OMAssociation;
import org.xdatabase.om.OMCollection;
import org.ximtec.iserver.event.GroupEvent;


/**
 * Collection of group members and subgroups which can be used as a user within
 * the system.
 * @version 1.0 Dec 2002
 * @author Beat Signer, signer@inf.ethz.ch
 */
public class Group extends User {

   private static final String SIZE = "size";

   private static final String ICON_NAME = ICON_PATH + "group";

   private static final String TOOLTIP = "A group consisting of other groups and individuals.";


   /**
    * Adds a new user (group or individual) to the group.
    * @param user the user to be added to the group.
    */
   public void addMember(User user) {
      IServer.associationHasMembers().add(this, user);
      IServer.fireMemberAdded(new GroupEvent(this, user));
   } // addMember


   /**
    * Removes a user (group or individual) from the group.
    * @param user the user to be removed from the group.
    */
   public void removeMember(User user) {
      IServer.associationHasMembers().remove(this, user);
      IServer.fireMemberRemoved(new GroupEvent(this, user));
   } // removeMember


   /**
    * Returns the "direct" members of the group (depth 1). Can be individuals or
    * subgroups.
    * @return the "direct" members of the group.
    */
   public OMCollection getDirectMembers() {
      return IServer.associationHasMembers().dr(this).range();
   } // getDirectMembers


   /**
    * Returns all members (individuals and groups) of the group and potential
    * subgroups (recursive).
    * @return all members of the group and subgroups.
    */
   public OMCollection getMembers() {
      OMCollection result;
      OMAssociation closure = IServer.associationHasMembers().closure();
      result = getDirectMembers();
      result.addAll(closure.dr(this).range());
      return result;
   } // getMembers


   /**
    * Returns true if the specified user is a direct member of the group (depth
    * 1).
    * @param user the user to be checked for.
    * @return true if the specified user is a direct member of the group
    */
   public boolean isDirectMember(User user) {
      return getDirectMembers().contains(user);
   } // isDirectMember


   /**
    * Returns true is the specified user is a member of the group or any
    * subgroups (recursive).
    * @param user the user to be checked for.
    * @return true if the specified user is a member of the group.
    */
   public boolean isMember(User user) {
      return getMembers().contains(user);
   } // isMember


   /**
    * Returns the string to be used to label this object.
    * @return string to be used to label this object.
    */
   @Override
   public synchronized String getLabelExtension() {
      String prefix = (!super.getLabelExtension().equals(Constant.EMPTY_STRING)) ? super
            .getLabelExtension()
            : Schema.TYPE_GROUP;
      return prefix + Constant.BLANK + Constant.OPEN_PARENTHESIS
            + getMembers().size() + Constant.CLOSE_PARENTHESIS;
   } // getLabelExtension


   /**
    * Returns an icon for the group.
    * @param size the size of the icon to be returned (16, 24 or 32 pixels). Use
    *           the SIZE constants defined in the Decorator interface for
    *           choosing the size.
    * @return icon for the group.
    */
   @Override
   public ImageIcon getIcon(int size) {
      return IconTool.getIcon(ICON_NAME, size);
   } // getIcon


   /**
    * Returns a tooltip for the group.
    * @return the group's tooltip.
    */
   @Override
   public String getTooltip() {
      return TOOLTIP;
   } // getTooltip


   /**
    * Returns a string representation of the group's content.
    * @return string representation of the group's content.
    */
   @Override
   public String toString() {
      InstanceInfo info = new InstanceInfo(this);
      info.add(super.toString());
      info.add(Constant.COMMA_BLANK);
      info.addAttribute(SIZE, getMembers().size());
      return info.toString();
   } // toString

}