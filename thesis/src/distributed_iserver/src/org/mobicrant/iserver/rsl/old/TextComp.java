/*
 * @(#)$Id: TextComp.java 364 2009-07-21 23:43:37Z D\signerb $
 *
 * Author       :   Beat Signer, signer@inf.ethz.ch
 *
 * Purpose      :   Text component managing a piece of text.
 *
 * -----------------------------------------------------------------------
 *
 * Revision Information:
 *
 * Date             Who         Reason
 *
 * Dec 27, 2002     bsigner     Initial Release
 * Jan 13, 2003     bsigner     Added content field
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
import org.ximtec.iserver.event.ResourceEvent;


/**
 * Text component managing a piece of text.
 * @version 1.0 Dec 2002
 * @author Beat Signer, signer@inf.ethz.ch
 */
public class TextComp extends Resource {

   private static final String ICON_NAME = ICON_PATH + "textComponent";

   private static final String TOOLTIP = "A text component.";


   /**
    * Sets the content of the textComp.
    * @param content the textComp's content.
    */
   public synchronized void setContent(String content) {
      this.setAttributeValue(Schema.TEXT_COMP_CONTENT, content, false);
      IServer.fireResourceUpdated(new ResourceEvent(this));
   } // setContent


   /**
    * Returns the textComp's content.
    * @return the textComp's content.
    */
   public synchronized String getContent() {
      return (String)this.getAttributeValue(Schema.TEXT_COMP_CONTENT, false);
   } // getContent


   /**
    * Returns an icon for the text component.
    * @param size the size of the icon to be returned (16, 24 or 32 pixels). Use
    *           the SIZE constants defined in the Decorator interface for
    *           choosing the size.
    * @return icon for the text component.
    */
   @Override
   public ImageIcon getIcon(int size) {
      return IconTool.getIcon(ICON_NAME, size);
   } // getIcon


   /**
    * Returns a tooltip for the text component.
    * @return the text component's tooltip.
    */
   @Override
   public String getTooltip() {
      return TOOLTIP;
   } // getTooltip

}