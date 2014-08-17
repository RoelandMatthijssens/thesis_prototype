package org.mobicrant.iserver;

import java.util.Collection;

import org.mobicrant.iserver.db.DatabaseManager;
import org.mobicrant.iserver.event.ResourceEvent;
import org.mobicrant.iserver.rsl.*;

public class IExtendedServer {

	
	
	public static Collection<AbstractRslElement> collectionTextComp() {
		   return DatabaseManager.getCurrentDatabaseManager().read(TextComp.class, "").getResults();
	   } // collectionTextComp
	
	 public static TextComp createTextComp(String name, Individual creator, String content) {
		 TextComp textComp = new TextComp();
	      textComp.setName(name);
	      textComp.setCreator(creator);
	      textComp.setContent(content);
	      DatabaseManager.getCurrentDatabaseManager().create(textComp);
	      IServer.fireResourceInitialised(new ResourceEvent(textComp));
	      return textComp;
	   } // createTextComp
  
  
  public static TextComp getTextComp(String name){
	   return (TextComp) DatabaseManager.getCurrentDatabaseManager().read(TextComp.class, "name == \""+name+"\"").getFirst();
  }
  
  
  public static void deleteTextComp(TextComp textComp) {
	      IServer.fireResourceDeleted(new ResourceEvent(textComp));
	      IServer.associationRefersTo().remove(new Object[] { null, textComp });
	      IServer.associationContains().remove(new Object[] { null, textComp });
	      DatabaseManager.getCurrentDatabaseManager().delete(textComp);
	   } // deleteTextComp
}
