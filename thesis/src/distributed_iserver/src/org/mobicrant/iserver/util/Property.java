

package org.mobicrant.iserver.util;



public class Property {

   private String key;
   private String value;


   public Property(String key, String value) {
      this.key = key;
      this.value = value;
   }


   public String getKey() {
      return key;
   } // getKey


   public void setKey(String key) {
      this.key = key;
   } // setKey


   public String getValue() {
      return value;
   } // setValue


   public void setValue(String value) {
      this.value = value;
   } // setValue


   /**
    * Returns a string representation of the classname and relevant attributes.
    * @return string representation of the classname and relevant attributes.
    */
   @Override
   public String toString() {
       return ("["+key+":"+value+"]");
   } // toString

}
