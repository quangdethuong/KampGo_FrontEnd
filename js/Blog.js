$(document).ready(async function () {

    $("#tags li").on("click", function () {
        var linkId = $(this).find("a").attr("id");
        var element = document.getElementById("blog");
        removeAllChildren(element);
        switch (linkId) {
            case "fashionTag":
                callAPITag(1);
                break;
            case "beautyTag":
                callAPITag(2);
                break;
            case "streetTag":
                callAPITag(3);
                break;
            case "lifeTag":
                callAPITag(4);
                break;
            case "DIYTag":
                callAPITag(5);
                break;
            default:
                console.log("Unknown action clicked");
                break;
        }
    });

    function removeAllChildren(parentElement) {
        while (parentElement.firstChild) {
            parentElement.removeChild(parentElement.firstChild);
        }
    }

    function callAPITag(tag) {
        fetch("http://localhost:8080/blog/tag/" + tag)
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

    function getAllBlog(page) {
        fetch("http://localhost:8080/blog/?page=" + page)
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

        data.content.forEach(element => {
            var resultHTML = ""
            var date = new Date(element.createDate);
            var monthNames = [
                "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Novr", "Dec"
            ];
            var month = monthNames[date.getMonth() + 1];
            var day = date.getDay() - 1;
            var year = date.getFullYear();
            resultHTML += `<div class="p-b-63">
            <a href="blog-detail.html" class="hov-img0 how-pos5-parent">
                <img src="${element.image}" alt="IMG-BLOG">
                <div class="flex-col-c-m size-123 bg9 how-pos5">
                    <span class="ltext-107 cl2 txt-center">
                        ${day}
                    </span>
                    <span class="stext-109 cl3 txt-center">
                        ${month + " " + year}
                    </span>
                </div>
            </a>
            <div class="p-t-32">
                <h4 class="p-b-15">
                    <a href="blog-detail.html" class="ltext-108 cl2 hov-cl1 trans-04">
                        ${element.title}
                    </a>
                </h4>
                <p class="stext-117 cl6">
                    ${element.content}
                </p>
                <div class="flex-w flex-sb-m p-t-18">
                    <span class="flex-w flex-m stext-111 cl2 p-r-30 m-tb-10", id = "owner">
                        <span>
                            <span class="cl4">By</span> ${element.user.username}
                            <span class="cl12 m-l-4 m-r-6">|</span>
                        </span>
                        <span id = "tag">
                        </span>
                        <span>
                             ${element.comments.length} comments
                        </span>
                    </span>
                    <a href="blog-detail.html?blogId=${element.id}" class="stext-101 cl2 hov-cl1 trans-04 m-tb-10">
                        Continue Reading
                        <i class="fa fa-long-arrow-right m-l-9"></i>
                    </a>
                </div>
            </div>
        </div>`;

            var $result = $(resultHTML);
            var spanElements = $result.find("#tag");
            $(document).ready(function () {
                // Loop through the array and create a <div> for each item
                $.each(element.tagBlogs, function (index, item) {

                    if (index == 0) {
                        spanElements.append(" " + item.tag.name);
                    } else {
                        spanElements.append(", " + item.tag.name);
                    }
                    if (index < element.tagBlogs.length - 1) {

                    }
                }
                );
                spanElements.append(' <span class="cl12 m-l-4 m-r-6">|</span>');
            });
            $('#blog').append($result);
        }
        );
        var pagination = `<div class="flex-l-m flex-w w-full p-t-10 m-lr--7" id="pagination"/>`;
        var $pagination = $(pagination);
        for (var i = 1; i <= data.numberOfPages; i++) {
            if (i === data.currentPage + 1) {
                $pagination.append(`<a href="#" class="flex-c-m how-pagination1 trans-04 m-all-7 active-pagination1" id=page` + i + `>
                `+ i + `
                </a>`)
            } else {
                $pagination.append(`<a href="#" class="flex-c-m how-pagination1 trans-04 m-all-7" id=page` + i + `>` + i + `</a>`)
            }
        }

        $pagination.on("click", "a", function (event) {
            event.preventDefault();
            var numericPart = parseInt($(this).attr("id").slice(4), 10) - 1;
            var element = document.getElementById("blog");
            removeAllChildren(element);
            getAllBlog(numericPart);
            window.scrollTo({ top: 0, behavior: "smooth" });
        });

        $('#blog').append($pagination);
    }

    getAllBlog(0);
});