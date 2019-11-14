package nl.java8.rest;


import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;


@Path("/jaxrs")
public class JaxAccess
{

	@Inject
	private ItemService itemService;

	@GET
	@Path("/items")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Item> getItems()
	{
		List<Item> itemList = itemService.getItemList();
		System.out.println("itemList " + itemList + " is requested from the server");
		return itemList;		
	}

	@GET
	@Path("/item/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Item getOneItem(@PathParam("id") int id)
	{
		List<Item> itemList = itemService.getItemList();
		for (Item oneItem : itemList)
		{
			if (oneItem.getId() == id)
			{
				System.out.println("item with id " + id + " is requested from the server");
				return oneItem;
			}
		}
		return null;
	}

 	@DELETE
	@Path("/item/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Item deleteItem(@PathParam("id") int id)
	{
		List<Item> itemList = itemService.getItemList();
		for (Item oneItem : itemList)
		{
			if (oneItem.getId() == id)
			{
				itemService.removeItem(oneItem);
				
				System.out.println("Deleted an item with name " + oneItem.getItemName() + "  "
						+ oneItem.getNameExt());
			}
		}
		return null;
	}  
	
	@POST
	@Path("/item")
	@Consumes(MediaType.APPLICATION_JSON)
	public void saveItem(Item item)
	{
		itemService.saveItem(item);
		
		System.out.println("JAX-RS @POST Saved an item with name " + item.getItemName() + "  "     //console output
				+ item.getNameExt() );
	}
}
