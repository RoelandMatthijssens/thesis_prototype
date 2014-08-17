package org.mobicrant.iserver;


import java.util.Iterator;

import org.mobicrant.iserver.db.DatabaseManager;
import org.mobicrant.iserver.db.DatabaseManager.DbSource;
import org.mobicrant.iserver.db.Result;
import org.mobicrant.iserver.rsl.AbstractRslElement;
import org.mobicrant.iserver.rsl.Entity;
import org.mobicrant.iserver.rsl.Group;
import org.mobicrant.iserver.rsl.Individual;


public class DistributedServerTest {

	private static DatabaseManager db = null;
	
	public DistributedServerTest(){
		//get a hook to a database
		db = DatabaseManager.getDatabaseManager(DbSource.Jdo);
		db.resetDb();
		test1();
		
		/* a few tests with the DB...*/
		//db.resetDb();
		//db.create(new Entity("test2"));							//exemple of adding a new entity
		Result res = db.read(Entity.class, "");			   		//exemple of fetching all instances of Entity class
		//Result res = db.read(Entity.class, "name == \"test2\"");	//exemple of fetching instances of Entity class with name = 'test2'
		
		
		//reading results and displaying them
		Iterator<AbstractRslElement> iter=res.getResults().iterator();
        while (iter.hasNext())
        {
            Object obj = iter.next();
            System.out.println(">  " + obj);
        }
		
	}
	
	
	
	private static void test1() {
	      Group globis = IServer.createGroup("GlobIS", "GlobIS Group");
	      Group test = IServer.createGroup("Test", "Test Group");
	      Individual beat = (Individual)IServer.createIndividual("Beat", "", "beat",
	            "beat");
	      Individual adriana = (Individual)IServer.createIndividual("Adriana", "",
	            "adriana", "adriana");
	      Individual nadir = (Individual)IServer.createIndividual("Nadir", "",
	            "nadir", "nadir");
	      Individual moira = (Individual)IServer.createIndividual("Moira", "",
	            "moira", "moira");
	      
	      
	      
	      test = ((Group)(db.read(Group.class, "name == \"GlobIS\"")).getFirst());
	      
	      System.out.println(test);
	      
	      test.addMember(beat);
	      test.addMember(adriana);
	      test.addMember(nadir);
	      test.addMember(moira);
//	      Log.printAssociation(IServer.associationHasMembers());
	      System.out.println("SIZE = " + test.getMembers().size());
	      test.removeMember(beat);
	      System.out.println("SIZE = " + test.getMembers().size());
	      test.removeMember(moira);
	      System.out.println("SIZE = " + test.getMembers().size());
	      test.removeMember(nadir);
	      System.out.println("SIZE = " + test.getMembers().size());
	      test.removeMember(adriana);
	      System.out.println("SIZE = " + test.getMembers().size());
	      globis.addMember(test);
	      db.commit();

	      
	      beat = ((Individual)(DatabaseManager.getCurrentDatabaseManager().read(Individual.class, "name == \"Beat\"")).getFirst());
	      System.out.println(beat);
	   }
	
	
	
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		new DistributedServerTest();
		
	}

}
