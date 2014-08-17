package org.mobicrant.iserver.db;

import java.util.ArrayList;
import java.util.Hashtable;
import java.util.Properties;
import java.util.Set;

import org.mobicrant.iserver.rsl.AbstractRslElement;

public class NoDatabaseConnector implements AbstractDatabaseConnector {

	private Hashtable<String, ArrayList<AbstractRslElement>> table = null; 
	
	
	@Override
	public boolean init(Properties properties) {
		table = new Hashtable<String, ArrayList<AbstractRslElement>>();
		return true;
	}

	@Override
	public boolean resetDb() {
		table = new Hashtable<String, ArrayList<AbstractRslElement>>();
		return true;
	}

	@Override
	public boolean create(Set<AbstractRslElement> rslElements) {
		for(AbstractRslElement i : rslElements){
			ArrayList<AbstractRslElement> r = table.get(i.getName());
			if(r == null){
				r = new ArrayList<AbstractRslElement>();
			}
			r.add(i);
			table.put(i.getName(), r);
		}
		return true;
	}

	@Override
	public boolean create(AbstractRslElement rslElement) {
		ArrayList<AbstractRslElement> r = table.get(rslElement.getName());
		if(r == null){
			r = new ArrayList<AbstractRslElement>();
		}
		r.add(rslElement);
		table.put(rslElement.getName(), r);
		return true;
	}

	@Override
	public Result read(String selectQuery) {
		// TODO no interpretation of queries... 
		Result res = new Result(table.get(selectQuery));
		return res;
	}

	@Override
	public Result read(Class<?> classConstraint, String filter) {
		ArrayList<AbstractRslElement> temp = table.get(filter);
		if(temp == null) return new Result(null);
		ArrayList<AbstractRslElement> res = new ArrayList<AbstractRslElement>();
		for(AbstractRslElement i : temp){
			//if(i instanceof classConstraint){
				res.add(i);
			//}
		}
		return new Result(res);
	}

	@Override
	public boolean update(Set<AbstractRslElement> rslElements) {
		ArrayList<AbstractRslElement> temp = null;
		for(AbstractRslElement rslElement : rslElements){
			temp = table.get(rslElement.getName());
			for(AbstractRslElement i : temp){
				if(i.equals(rslElement)){
					temp.remove(i);
					temp.add(rslElement);	//certainly useless, as the object is directly modified... or maybe case of Serializable objects?
				}
			}
		}
		return true;
	}

	@Override
	public boolean update(AbstractRslElement rslElement) {
		ArrayList<AbstractRslElement> temp = table.get(rslElement.getName());
		for(AbstractRslElement i : temp){
			if(i.equals(rslElement)){
				temp.remove(i);
				temp.add(rslElement);	//certainly useless, as the object is directly modified... or maybe case of Serializable objects?
			}
		}
		return true;
	}

	@Override
	public boolean delete(Set<AbstractRslElement> rslElements) {
		ArrayList<AbstractRslElement> temp = null;
		for(AbstractRslElement rslElement : rslElements){
			temp = table.get(rslElement.getName());
			for(AbstractRslElement i : temp){
				if(i.equals(rslElement)){
					temp.remove(i);
				}
			}
		}
		return true;
	}

	@Override
	public boolean delete(AbstractRslElement rslElement) {
		ArrayList<AbstractRslElement> temp = table.get(rslElement.getName());
		for(AbstractRslElement i : temp){
			if(i.equals(rslElement)){
				temp.remove(i);
			}
		}
		return true;
	}

	@Override
	public boolean commit() {
		return true;
	}

	@Override
	public boolean closeDb() {
		return true;
	}

}
