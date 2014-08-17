/*
 * @(#)$Id: Resource.java 364 2009-07-21 23:43:37Z D\signerb $
 *
 * Author       :   Beat Signer, signer@inf.ethz.ch
 *
 * Purpose      :   Resource representing an entire information unit
 *                  which can be addressed.
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
import org.sigtec.om.util.Polymorphism;
import org.xdatabase.om.OMCollection;
import org.xdatabase.om.OMIterator;
import org.ximtec.iserver.core.resource.Template;
import org.ximtec.iserver.event.ResourceEvent;
import org.ximtec.iserver.util.Property;


/**
 * Resource representing an entire information unit which can be addressed.
 * @version 1.0 Dec 2002
 * @author Beat Signer, signer@inf.ethz.ch
 */
public class Resource extends Entity {

   private static final String ICON_NAME = ICON_PATH + "resource";

   private static final String TOOLTIP = "A resource.";

   protected static final String METHOD_ADD_SELECTOR = "addSelector";
   protected static final String METHOD_REMOVE_SELECTOR = "removeSelector";

   protected static final String INCOMPATIBLE_ARGUMENT = "incompatible argument: selector = ";
   

   @Override
   public synchronized void setName(String name) {
      super.setName(name);
      IServer.fireResourceUpdated(new ResourceEvent(this));
   } // setName


   @Override
   public synchronized void setCreator(Individual individual) {
      super.setCreator(individual);
      IServer.fireResourceUpdated(new ResourceEvent(this));
   } // setCreator


   @Override
   public boolean addAuthorisedUser(User user) {
      boolean result = super.addAuthorisedUser(user);
      IServer.fireResourceUpdated(new ResourceEvent(this));
      return result;
   } // addAuthorisedUser


   @Override
   public boolean removeAuthorisedUser(User user) {
      boolean result = super.removeAuthorisedUser(user);
      IServer.fireResourceUpdated(new ResourceEvent(this));
      return result;
   } // removeAuthorisedUser


   @Override
   public boolean addUnauthorisedUser(User user) {
      boolean result = super.addUnauthorisedUser(user);
      IServer.fireResourceUpdated(new ResourceEvent(this));
      return result;
   } // addUnauthorisedUser


   @Override
   public boolean removeUnauthorisedUser(User user) {
      boolean result = super.removeUnauthorisedUser(user);
      IServer.fireResourceUpdated(new ResourceEvent(this));
      return result;
   } // removeUnauthorisedUser


   @Override
   public boolean addProperty(String key, String value) {
      boolean result = super.addProperty(key, value);
      IServer.fireResourceUpdated(new ResourceEvent(this));
      return result;
   } // addProperty


   @Override
   public boolean addProperty(Property property) {
      boolean result = super.addProperty(property);
      IServer.fireResourceUpdated(new ResourceEvent(this));
      return result;
   } // addProperty


   @Override
   public boolean removeProperty(String key) {
      boolean result = super.removeProperty(key);
      IServer.fireResourceUpdated(new ResourceEvent(this));
      return result;
   } // removeProperty


   /**
    * Adds a selector to the resource. If the selector already is bound to
    * another resource, it will first be removed from this resource (removed from
    * association 'RefersTo').
    * @param selector the selector to be added to the resource.
    * @return true if the selector has been added to the resource.
    */
   public boolean addSelector(Selector selector) {
      IServer.associationRefersTo().remove(new Object[] { selector, null });
      boolean result = IServer.associationRefersTo().add(selector, this);
      IServer.fireResourceUpdated(new ResourceEvent(this));
      return result;
   } // addSelector


   /**
    * Removes a selector from the resource.
    * @param selector the selector to be removed from the resource.
    */
   public void removeSelector(Selector selector) {
      IServer.associationRefersTo().remove(new Object[] { selector, this });
      IServer.fireResourceUpdated(new ResourceEvent(this));
   } // removeSelector


   /**
    * Returns all selectors associated with this resource.
    * @return all selectors associated with this resource.
    */
   public OMCollection getSelectors() {
      OMCollection result = IServer.associationRefersTo().rr(this).domain();
      
      for (OMIterator templates = getTemplates().instances(); templates.hasNext();) {
         Template template = (Template)templates.nextInstance();
         result.addAll(template.getSelectors());
      }
      
      return result;
   } // getSelectors


   /**
    * Returns all selectors associated with this resource within a specific range
    * of layers.
    * @param minLayer the minimum layer.
    * @param maxLayer the maximum layer.
    * @return all selectors associated with this resource.
    */
   public OMCollection getSelectors(Layer minLayer, Layer maxLayer) {
      OMCollection result = getWorkspace().createCollection(null,
            OMCollection.SET, Schema.TYPE_SELECTOR);
      OMCollection selectors = getSelectors();
      int minL = (minLayer != null) ? IServer.collectionLayers().indexOf(
            minLayer.getBaseObject()) : 0;
      int maxL = (maxLayer != null) ? IServer.collectionLayers().indexOf(
            maxLayer.getBaseObject()) : Integer.MAX_VALUE;

      for (OMIterator iterator = selectors.instances(); iterator.hasNext();) {
         Selector currentSelector = (Selector)Polymorphism
               .getLeafInstance(iterator.nextInstance());
         int currentLayer = IServer.collectionLayers().indexOf(
               currentSelector.getLayer().getBaseObject());

         if ((currentLayer >= minL) && (currentLayer <= maxL)) {
            result.add(currentSelector);
         }

      }

      return result;
   } // getSelectors


   /**
    * Adds a template to the resource.
    * @param template the template to be added to the resource.
    * @return true if the template has been added to the resource.
    */
   public boolean addTemplate(Template template) {
      boolean result = IServer.associationHasTemplate().add(this, template);
      IServer.fireResourceUpdated(new ResourceEvent(this));
      return result;
   } // addTemplate

   
   /**
    * Removes a template from the resource.
    * @param template the template to be removed from the resource.
    */
   public void removeTemplate(Template template) {
      IServer.associationHasTemplate().remove(new Object[] { this, template });
      IServer.fireResourceUpdated(new ResourceEvent(this));
   } // removeTemplate
   
   
   /**
    * Returns all templates associated with this resource.
    * @return all templates associated with this resource.
    */
   public OMCollection getTemplates() {
      return IServer.associationHasTemplate().dr(this).range();
   } // getTemplates
   

   public boolean isPlugin() {
      return false;
   } // isPlugin


   /**
    * Returns an icon for the resource.
    * @param size the size of the icon to be returned (16, 24 or 32 pixels). Use
    *           the SIZE constants defined in the Decorator interface for
    *           choosing the size.
    * @return icon for the resource.
    */
   @Override
   public ImageIcon getIcon(int size) {
      return IconTool.getIcon(ICON_NAME, size);
   } // getIcon


   /**
    * Returns a tooltip for the resource.
    * @return the resource's tooltip.
    */
   @Override
   public String getTooltip() {
      return TOOLTIP;
   } // getTooltip

}