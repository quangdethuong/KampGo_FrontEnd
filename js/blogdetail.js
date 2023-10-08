$(document).ready(function () {
  var urlParams = new URLSearchParams(window.location.search);
  var blogId = urlParams.get("blogId");
  function callAPITag(blogId) {

    fetch("http://localhost:8080/blog/" + blogId)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        output(data);
      })
      .catch(error => {
        console.error("Fetch error:", error);
      });
  }

  function output(data) {
    var spanRoute = document.getElementById("route");
    spanRoute.append(data.title);
    var date = new Date(data.createDate);
    var monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Novr", "Dec"
    ];
    var month = monthNames[date.getMonth() + 1];

    var day = date.getDay() - 1;
    var year = date.getFullYear();
    var dayDiv = document.getElementById("day");
    dayDiv.append(day);
    var monthDiv = document.getElementById("month");
    monthDiv.append(month + " " + year);
    var inforhtml = `<span>
      <span class="cl4">By</span> ${data.user.username}
      <span class="cl12 m-l-4 m-r-6">|</span>
    </span>
    <span>
      ${day + " " + month + " " + year}
      <span class="cl12 m-l-4 m-r-6">|</span>
    </span>
    <span id = "tag"></span>
    <span>
      ${data.comments.length} comments
    </span>`;
    var $info = $(inforhtml);
    $('#infor').append($info);
    var spanElements = document.getElementById("tag");
    var tagsElements = document.getElementById("tagsCircle");
    // Loop through the array and create a <div> for each item
    data.tagBlogs.forEach((element, index) => {
      if (index == 0) {
        spanElements.append(" " + element.tag.name);
      } else {
        spanElements.append(", " + element.tag.name);
      }
      $('#tagsCircle').append(`<a href="#" class="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5">` + element.tag.name + `</a>`);
    });
    var stand = $(`<span class="cl12 m-l-4 m-r-6">|</span>`);
    $("#tag").append(stand);
    var titleElement = document.getElementById("title");
    titleElement.append(data.title);
    var contentElement = document.getElementById("content");
    contentElement.append(data.description);
    var imageElement = document.getElementById("img");
    imageElement.src = data.image;
  }

  callAPITag(blogId);
});