const url = " https://crudcrud.com/api/b35dbba3968448e2b55a2c2e63d0fd92";
function handleFormSubmit(event) {
    event.preventDefault();
    var userItem = document.getElementById("userItem");
    var itemname = document.getElementById("itemname").value;
    var description = document.getElementById("description").value;
    var price = document.getElementById("price").value;
    var quantity = document.getElementById("quantity").value;
    var itemDetails = {
      itemname: itemname,
      description: description,
      price: price,
      quantity: quantity,
    };
    var createdItemId;
    axios
      .post(
        `${url}/item`,
        itemDetails
      )
      .then(function (response) {
          var createdItem=response.data;
        console.log("Data stored in the cloud:", createdItem);
        createdItemId = createdItem._id;
      })
      .catch(function (error) {
        console.error("Error storing data in the cloud:", error);
      });
    var newLi = document.createElement("li");
    newLi.innerHTML = `Itemname: ${itemDetails.itemname}, Description: ${itemDetails.description}, Price: ${itemDetails.price} , Quantity: ${itemDetails.quantity}`;
    userItem.appendChild(newLi);
  
    var buyButton1 = document.createElement("button");
    buyButton1.innerHTML = "Buy 1";
    buyButton1.style.cursor = "pointer";
  
    var buyButton2 = document.createElement("button");
    buyButton2.innerHTML = "Buy 2";
    buyButton2.style.cursor = "pointer";
  
    var buyButton3 = document.createElement("button");
    buyButton3.innerHTML = "Buy 3";
    buyButton3.style.cursor = "pointer";
  
    newLi.appendChild(buyButton1);
    newLi.appendChild(buyButton2);
    newLi.appendChild(buyButton3);
    userItem.appendChild(newLi);
    buyButton1.addEventListener("click", function () {
      const newquantity = itemDetails.quantity - 1;
      newLi.innerHTML = `Itemname: ${itemDetails.itemname}, Description: ${itemDetails.description}, Price: ${itemDetails.price} , Quantity: ${newquantity}`;
      newLi.appendChild(buyButton1);
      newLi.appendChild(buyButton2);
      newLi.appendChild(buyButton3);
      userItem.appendChild(newLi);
  
      axios
          .post(
              `${url}/item`,
              {
                  itemname: itemDetails.itemname,
                  description: itemDetails.description,
                  price: itemDetails.price,
                  quantity: newquantity,
              }
          )
          .then(function (response) {
              var updatedItem = response.data;
              updatedItem._id = response.data._id;
  
              console.log("Item updated successfully:", updatedItem);
  
              let newLi2 = document.createElement("li");
              newLi2.innerHTML = `Itemname: ${updatedItem.itemname}, Description: ${updatedItem.description}, Price: ${updatedItem.price} , Quantity: ${updatedItem.quantity}`;
              userItem.appendChild(newLi2);
              buttonUpdate(updatedItem._id, newLi2);
  
              // console.log("Deleting item with ID:", updatedItem._id);
              // userItem.removeChild(newLi);
              userItem.removeChild(newLi);
  
              axios
                  .delete(`${url}/item/${createdItemId}`)
                  .then(function (deleteResponse) {
                      console.log("Item deleted successfully:", deleteResponse.data);
                       // Remove the original item from the DOM
                  })
                  .catch(function (deleteError) {
                      console.error("Error deleting old item:", deleteError);
                  });
          })
          .catch(function (error) {
              console.error("Error updating item:", error);
          });
  });
  
    buyButton2.addEventListener("click", function () {
      const newquantity = itemDetails.quantity - 2;
      newLi.innerHTML = `Itemname: ${itemDetails.itemname}, Description: ${itemDetails.description}, Price: ${itemDetails.price} , Quantity: ${newquantity}`;
      newLi.appendChild(buyButton1);
      newLi.appendChild(buyButton2);
      newLi.appendChild(buyButton3);
      userItem.appendChild(newLi);
      axios
      .post(
        `${url}/item`,
        {
          itemname: itemDetails.itemname,
          description: itemDetails.description,
          price: itemDetails.price,
          quantity: newquantity,
        }
      )
      .then(function (response) {
        var updatedItem = response.data;
        updatedItem._id = response.data._id;
  
        console.log("Item updated successfully:", updatedItem);
  
        let newLi2 = document.createElement("li");
        newLi2.innerHTML = `Itemname: ${updatedItem.itemname}, Description: ${updatedItem.description}, Price: ${updatedItem.price} , Quantity: ${updatedItem.quantity}`;
        userItem.appendChild(newLi2);
        buttonUpdate(updatedItem._id, newLi2);
        userItem.removeChild(newLi);
        axios
        .delete(`${url}/item/${createdItemId}`)
        .then(function (deleteResponse) {
            console.log("Item deleted successfully:", deleteResponse.data);
            userItem.removeChild(newLi); // Remove the original item from the DOM
        })
        .catch(function (deleteError) {
            console.error("Error deleting old item:", deleteError);
        });
      })
      .catch(function (error) {
        console.error("Error updating item:", error);
      });
    });
    buyButton3.addEventListener("click", function () {
      const newquantity = itemDetails.quantity - 3;
      newLi.innerHTML = `Itemname: ${itemDetails.itemname}, Description: ${itemDetails.description}, Price: ${itemDetails.price} , Quantity: ${newquantity}`;
      newLi.appendChild(buyButton1);
      newLi.appendChild(buyButton2);
      newLi.appendChild(buyButton3);
      userItem.appendChild(newLi);
      axios
      .post(
        `${url}/item`,
        {
          itemname: itemDetails.itemname,
          description: itemDetails.description,
          price: itemDetails.price,
          quantity: newquantity,
        }
      )
      .then(function (response) {
        var updatedItem = response.data;
        updatedItem._id = response.data._id;
  
        console.log("Item updated successfully:", updatedItem);
  
        let newLi2 = document.createElement("li");
        newLi2.innerHTML = `Itemname: ${updatedItem.itemname}, Description: ${updatedItem.description}, Price: ${updatedItem.price} , Quantity: ${updatedItem.quantity}`;
        userItem.appendChild(newLi2);
        buttonUpdate(updatedItem._id, newLi2);
        userItem.removeChild(newLi);
        axios
        .delete(`${url}/item/${createdItemId}`)
        .then(function (deleteResponse) {
            console.log("Item deleted successfully:", deleteResponse.data);
            userItem.removeChild(newLi); // Remove the original item from the DOM
        })
        .catch(function (deleteError) {
            console.error("Error deleting old item:", deleteError);
        });
      })
      .catch(function (error) {
        console.error("Error updating item:", error);
      });
    });
  
    document.getElementById("itemname").value = "";
    document.getElementById("description").value = "";
    document.getElementById("price").value = "";
    document.getElementById("quantity").value = "";
  }
  
  function initUI() {
    axios
      .get(`${url}/item`)
      .then(function (response) {
        var userDetailsArray = response.data;
  
        userItem.innerHTML = "";
  
        userDetailsArray.forEach(function (itemDetails) {
          let listItem = document.createElement("li");
  
          listItem.textContent = `Itemname: ${itemDetails.itemname}, Description: ${itemDetails.description}, Price: ${itemDetails.price} , Quantity: ${itemDetails.quantity}`;
          buttonUpdate(itemDetails._id, listItem);
        });
      })
      .catch(function (error) {
        console.error("Error fetching data from the cloud:", error);
      });
  }
  function buttonUpdate(ItemId, listItem) {
    var buyButton1 = document.createElement("button");
    buyButton1.innerHTML = "Buy 1";
    buyButton1.style.cursor = "pointer";
    buyButton1.onclick = function () {
      buy(ItemId, 1, listItem);
    };
  
    var buyButton2 = document.createElement("button");
    buyButton2.innerHTML = "Buy 2";
    buyButton2.style.cursor = "pointer";
    buyButton2.onclick = function () {
      buy(ItemId, 2, listItem);
    };
  
    var buyButton3 = document.createElement("button");
    buyButton3.innerHTML = "Buy 3";
    buyButton3.style.cursor = "pointer";
    buyButton3.onclick = function () {
      buy(ItemId, 3, listItem);
    };
  
    listItem.appendChild(buyButton1);
    listItem.appendChild(buyButton2);
    listItem.appendChild(buyButton3);
  
    userItem.appendChild(listItem);
  }
  function buy(itemId, no, listItem) {
    axios
      .get(
        `${url}/item/${itemId}`
      )
      .then(function (response) {
        console.log("fetching item details:", response);
  
        var currentItem = response.data;
        // Make modifications to the item details
        var updatedQuantity = currentItem.quantity - no;
        console.log(updatedQuantity);
        var updatedItem = {
          //   id:itemId,
          itemname: currentItem.itemname,
          description: currentItem.description,
          price: currentItem.price,
          quantity: updatedQuantity,
        };
        axios
          .put(
            `${url}/item/${itemId}`,
            updatedItem
          )
          .then(function (putResponse) {
            updatedItem._id = itemId;
            console.log("Item updated successfully:", updatedItem);
            let newLi3 = document.createElement("li");
            newLi3.innerHTML = `Itemname: ${updatedItem.itemname}, Description: ${updatedItem.description}, Price: ${updatedItem.price} , Quantity: ${updatedItem.quantity}`;
            userItem.appendChild(newLi3);
            buttonUpdate(updatedItem._id, newLi3);
            userItem.removeChild(listItem);
          })
          .catch(function (putError) {
            console.error("Error updating item:", putError);
          });
      })
      .catch(function (getError) {
        console.error("Error fetching item details:", getError);
      });
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    initUI();
  });