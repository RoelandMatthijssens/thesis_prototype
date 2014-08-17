/*
 * @(#)$Id: Medium.java 364 2009-07-21 23:43:37Z D\signerb $
 *
 * Author       :   Beat Signer, signer@inf.ethz.ch
 *
 * Purpose      :   Medium of any mime type.
 *
 * -----------------------------------------------------------------------
 *
 * Revision Information:
 *
 * Date             Who         Reason
 *
 * Dec 27, 2002     bsigner     Initial Release
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
import org.xdatabase.om.basetype.OMMime;
import org.ximtec.iserver.event.ResourceEvent;


/**
 * Medium of any mime type.
 * @version 1.0 Dec 2002
 * @author Beat Signer, signer@inf.ethz.ch
 */
public class Medium extends Resource {

   private static final String ICON_NAME = ICON_PATH + "medium";

   private static final String TOOLTIP = "A medium.";


   /**
    * Sets the description of the medium.
    * @param description the medium's description.
    */
   public synchronized void setDescription(String description) {
      this.setAttributeValue(Schema.MEDIUM_DESCRIPTION, description, false);
      IServer.fireResourceUpdated(new ResourceEvent(this));
   } // setDescription


   /**
    * Returns the medium's description.
    * @return the medium's description.
    */
   public synchronized String getDescription() {
      return (String)this.getAttributeValue(Schema.MEDIUM_DESCRIPTION, false);
   } // getDescription


   /**
    * Sets the content of the medium.
    * @param content the medium's content.
    */
   public synchronized void setContent(OMMime content) {
      this.setAttributeValue(Schema.MEDIUM_CONTENT, content, false);
      IServer.fireResourceUpdated(new ResourceEvent(this));
   } // setContent


   /**
    * Returns the medium's content.
    * @return the medium's content.
    */
   public synchronized OMMime getContent() {
      return (OMMime)this.getAttributeValue(Schema.MEDIUM_CONTENT, false);
   } // getContent


   /**
    * Returns the name to be used to label this object.
    * @return name to be used to label this object.
    */
   @Override
   public synchronized String getLabelExtension() {
      return (getName() != null) ? getName() : Constant.EMPTY_STRING;
   } // getLabelExtension


   /**
    * Returns the type of the resource.
    * @return the resource's type.
    */
   @Override
   public String getType() {
      return Type.MEDIUM;
   } // getType


   /**
    * Returns an icon for the medium.
    * @param size the size of the icon to be returned (16, 24 or 32 pixels). Use
    *           the SIZE constants defined in the Decorator interface for
    *           choosing the size.
    * @return icon for the medium.
    */
   @Override
   public ImageIcon getIcon(int size) {
      return IconTool.getIcon(ICON_NAME, size);
   } // getIcon


   /**
    * Returns a tooltip for the medium.
    * @return the medium's tooltip.
    */
   @Override
   public String getTooltip() {
      return TOOLTIP;
   } // getTooltip


   /**
    * Returns a string representation of the medium's content.
    * @return string representation of the medium's content.
    */
   @Override
   public String toString() {
      InstanceInfo info = new InstanceInfo(this);
      info.add(super.toString());
      info.add(Constant.COMMA_BLANK);
      info.addAttribute(Schema.MEDIUM_DESCRIPTION, getDescription());
      info.addAttribute(Schema.MEDIUM_CONTENT, getContent());
      return info.toString();
   } // toString

}