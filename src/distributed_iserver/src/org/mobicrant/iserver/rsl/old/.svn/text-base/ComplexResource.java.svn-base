/*
 * @(#)$Id: ComplexResource.java 364 2009-07-21 23:43:37Z D\signerb $
 *
 * Author       :   Beat Signer, signer@inf.ethz.ch
 *
 * Purpose      :   Composition of multiple resources.
 *
 * -----------------------------------------------------------------------
 *
 * Revision Information:
 *
 * Date             Who         Reason
 *
 * Jan 15, 2003     bsigner     Initial Release
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

import static org.ximtec.iserver.util.Constant.ICON_RESOURCE_PATH;

import javax.swing.ImageIcon;

import org.sigtec.graphix.IconTool;
import org.sigtec.util.Constant;
import org.sigtec.util.InstanceInfo;
import org.xdatabase.om.OMCollection;
import org.ximtec.iserver.event.ResourceEvent;


/**
 * Composition of multiple resources.
 * @version 1.0 Jan 2003
 * @author Beat Signer, signer@inf.ethz.ch
 */
public class ComplexResource extends Resource {

   private static final String SIZE = "size";

   private static final String ICON_NAME = ICON_RESOURCE_PATH
         + "complexResource";

   private static final String TOOLTIP = "A complex resource is a composite of multiple resources.";


   /**
    * Adds a resource to the complex resource.
    * @param resource the resource to be added to the complex resource.
    * @return true if the resource has been added.
    */
   public boolean addResource(Resource resource) {
      boolean result = IServer.associationContains().add(this, resource);
      IServer.fireResourceUpdated(new ResourceEvent(this));
      return result;
   } // addResource


   /**
    * Removes the specified resource from the complex resource.
    * @param resource the resource to be removed from the complex resource.
    * @return true if the resource has been removed.
    */
   public boolean removeResource(Resource resource) {
      boolean result = IServer.associationContains().remove(this, resource);
      IServer.fireResourceUpdated(new ResourceEvent(this));
      return result;
   } // removeResource


   /**
    * Returns all resources part of the complex resource.
    * @return all resources part of the complex resource.
    */
   public OMCollection getResources() {
      return IServer.associationContains().dr(this).range();
   } // getResources


   /**
    * Returns the string to be used to label this object.
    * @return string to be used to label this object.
    */
   @Override
   public synchronized String getLabelExtension() {
      String prefix = (!super.getLabelExtension().equals(Constant.EMPTY_STRING)) ? super
            .getLabelExtension()
            : Schema.TYPE_COMPLEX_RESOURCE;
      return prefix + Constant.BLANK + Constant.OPEN_PARENTHESIS
            + getResources().size() + Constant.CLOSE_PARENTHESIS;
   } // getLabelExtension


   /**
    * Returns an icon for the complex resource.
    * @param size the size of the icon to be returned (16, 24 or 32 pixels). Use
    *           the SIZE constants defined in the Decorator interface for
    *           choosing the size.
    * @return icon for the complex resource.
    */
   @Override
   public ImageIcon getIcon(int size) {
      return IconTool.getIcon(ICON_NAME, size);
   } // getIcon


   /**
    * Returns a tooltip for the complex resource.
    * @return the complex resource's tooltip.
    */
   @Override
   public String getTooltip() {
      return TOOLTIP;
   } // getTooltip


   /**
    * Returns a string representation of the complex resource's content.
    * @return string representation of the complex resource's content.
    */
   @Override
   public String toString() {
      InstanceInfo info = new InstanceInfo(this);
      info.add(super.toString());
      info.add(Constant.COMMA_BLANK);
      info.addAttribute(SIZE, getResources().size());
      return info.toString();
   } // toString

}