package org.mobicrant.iserver.util;

import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;

import org.mobicrant.iserver.rsl.Entity;


@PersistenceCapable
public class LinkedList {

	
		@Persistent
		private ListElement head;
		@Persistent
		int size;

		public LinkedList()
		{
			head = null;
			size=0;
		}

		public void addFirst(Entity o)
		{
			head = new ListElement(o,head);
			size++;
		}

		public Entity getFirst()
		{
			if(head!=null)
			return head.first();
			
			else return null;
		}

		public boolean deleteObject(Entity y)
		{
			if(head!= null)
			{
				
					ListElement d = head;
					ListElement prev = d;
					ListElement next=d.rest();
					boolean find=false;
					while(!find && d !=null)
					{
						if(d.first().getName().equals(y.getName()))
						{ find= true;
						}
						else{
						prev=d;
						d = d.rest();
						if(d.rest()!=null) next=d.rest();
						}
				
						
					} //while
					
					
					if(find) 
					{
					prev.setRest(next);
					size--;
					return true;
					}
					
					}
			
			return false;

			
			
		}//method deleteObject
		
		
		
		// insert after object
		public void insertAfterObject(Entity y, Entity o)
		{ ListElement newEl= new ListElement(y);
			if(head!= null)
			{
				
					ListElement d = head;
					ListElement next=d.rest();
					boolean find=false;
					while(!find && d !=null)
					{
						if(d.first().getName().equals(o.getName()))
						{ find= true;
						}
						else{
						d = d.rest();
						if(d.rest()!=null) next=d.rest();
						}
				
						
					} //while
					
					
					if(find) 
					{
					if(d==next) //last element
					{this.addLast(y);
					} //if d==next
					
					else { d.setRest(newEl);
					      d.rest().setRest(next);
					      size++;
					     } //else d!= next
					
					} //if find
					
					}
			
			

			
			
		}//method deleteObject
		
		
		

		
		
		
		
		
		//********* 4th question
		
		public Entity retreiveLast(){
			
			if(head!=null){
			ListElement d= head;
			while(d.rest()!=null){
				d=d.rest();
			}
			return d.first();
		}
			
		return null;}
		 //********** 5ht question
		
		public void addLast(Entity o){
			ListElement newEl= new ListElement(o);
			//case it is empty
			if (head==null)
			{
				head=newEl;
				size++;
			}
			
			else{
				ListElement d=head;
					
			while(d.rest()!=null){
				d=d.rest(); }
			d.setRest(newEl);
			size++;
			}
			
		}
		
		//****** 6th
		public Boolean search(Entity o){
			ListElement d=head;
			while(d!= null){
				if(d.first().equals(o)) return true;
				else d=d.rest();
			}
			return false;
						
		}
		
		//******
		
		
		
		 @Override
	public String toString(){
			 String ret="";
			 if(head!=null){
		ListElement d= head;
		
		while(d!= null)
		{
		ret+=d.first().getName();	
		d=d.rest();	
		}
		return ret;
			 }
			 else {ret+="NoConent"; return ret; }
	}
	// 2nd question
		
		public int retreiveSize(){
			return size;
		}
		//********
		// Extra two methods to use them in Stack and Queue..
		public void deleteLast(){
			
			ListElement prev, current;
			
			if(head!=null){ //work only if the linkedList has elements..
				// Case that the LinkedList has only one element
				if(head.rest()== null){ 
					head=null;
					size-- ; 
				}
				
				else {
					prev=head;
					current=prev.rest();
					
					while(current.rest()!=null)
					{
						prev=current;
						current=current.rest();
					}
					// now the current points to the last element while the prev points to the one before
					
					prev.setRest(null);
					size--;
					
				}// else : case that it has more than 1 element...
				
			} // if the LinkedList is not empty
		} // method deleteLast..
		
		public void deleteFirst(){
			if(head!=null){
				head= head.rest();
				size --;
			}
		}
		
		//************************************************************
	
	
		
		
	} //Class Linked List


	
	

