/*
 * @(#)$Id: Individual.java 364 2009-07-21 23:43:37Z D\signerb $
 *
 * Author       :   Beat Signer, signer@inf.ethz.ch
 *
 * Purpose      :   Individual user of the system.
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
import org.ximtec.iserver.event.UserEvent;


/**
 * Individual user of the system.
 * @version 1.0 Dec 2002
 * @author Beat Signer, signer@inf.ethz.ch
 */
public class Individual extends User {

   private static final String ICON_NAME = ICON_PATH + "individual";

   private static final String TOOLTIP = "A system user.";


   /**
    * Sets the login name of the individual.
    * @param login the individual's login name.
    */
   public synchronized void setLogin(String login) {
      this.setAttributeValue(Schema.INDIVIDUAL_LOGIN, login, false);
      IServer.fireUserUpdated(new UserEvent(this));
   } // setLogin


   /**
    * Returns the individual's login name.
    * @return the individual's login name.
    */
   public synchronized String getLogin() {
      return (String)this.getAttributeValue(Schema.INDIVIDUAL_LOGIN, false);
   } // getLogin


   /**
    * Sets the password of the individual.
    * @param password the individual's password.
    */
   public synchronized void setPasswd(String password) {
      this.setAttributeValue(Schema.INDIVIDUAL_PASSWORD, password, false);
      IServer.fireUserUpdated(new UserEvent(this));
   } // setPassword


   /**
    * Returns the individual's password.
    * @return the individual's password.
    */
   public synchronized String getPassword() {
      return (String)this.getAttributeValue(Schema.INDIVIDUAL_PASSWORD, false);
   } // getPassword


   /**
    * Returns the string to be used to label this object.
    * @return string to be used to label this object.
    */
   @Override
   public synchronized String getLabelExtension() {
      return (!super.getLabelExtension().equals(Constant.EMPTY_STRING)) ? super
            .getLabelExtension()
            + Constant.COMMA + Constant.BLANK + getLogin() : getLogin();
   } // getLabelExtension


   /**
    * Returns an icon for the individual.
    * @param size the size of the icon to be returned (16, 24 or 32 pixels). Use
    *           the SIZE constants defined in the Decorator interface for
    *           choosing the size.
    * @return icon for the individual.
    */
   @Override
   public ImageIcon getIcon(int size) {
      return IconTool.getIcon(ICON_NAME, size);
   } // getIcon


   /**
    * Returns a tooltip for the individual.
    * @return the individual's tooltip.
    */
   @Override
   public String getTooltip() {
      return TOOLTIP;
   } // getTooltip


   /**
    * Returns a string representation of the individual's content.
    * @return string representation of the individual's content.
    */
   @Override
   public String toString() {
      InstanceInfo info = new InstanceInfo(this);
      info.add(super.toString());
      info.add(Constant.COMMA_BLANK);
      info.addAttribute(Schema.INDIVIDUAL_LOGIN, getLogin());
      info.addAttribute(Schema.INDIVIDUAL_PASSWORD, getPassword());
      return info.toString();
   } // toString

}