<?php
session_start();

if (!isset($_SESSION['token']) || !isset($_SESSION['userId'])) {
  echo 'Bu sayfaya erişim yetkiniz yoktur! Lütfen önce giriş yapınız!<br>';
  echo '<a href="login.php">Giriş yapmak için tıklayınız.</a>';
  die();
}

?>
<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">

  <title>Dashboard - RealMove</title>

  <!-- Bootstrap core CSS -->
  <link href="css/bootstrap.min.css" rel="stylesheet">

  <!-- Custom styles for this template -->
  <link href="css/starter-template.css" rel="stylesheet">
</head>

<body>

  <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
    <a class="navbar-brand" href="#">RealMove</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarsExampleDefault">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active">
          <a class="nav-link" href="#">Advert Approvals</a>
        </li>
      </ul>

      <button type="button" class="btn btn-outline-light btn-sm" data-toggle="modal" data-target="#exampleModal">
        Logout
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-power" viewBox="0 0 16 15">
          <path fill-rule="evenodd" d="M5.578 4.437a5 5 0 1 0 4.922.044l.5-.866a6 6 0 1 1-5.908-.053l.486.875z" />
          <path fill-rule="evenodd" d="M7.5 8V1h1v7h-1z" />
        </svg>
      </button>

    </div>
  </nav>

  <main role="main" class="container">

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <br>
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Confirmation</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Are you sure you want to logout?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Close</button>
            <form class="form-inline my-2 my-lg-0" action="logout.php">
              <button class="btn btn-outline-danger my-2 my-sm-0" type="submit">Logout</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete response modal -->
    <!-- Reject Modal -->
    <div class="modal fade" id="rejectedModal" tabindex="-1" role="dialog" aria-labelledby="rejectedModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">System Message</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            The advert has been deleted successfully!
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Approve Modal -->
    <div class="modal fade" id="approveModal" tabindex="-1" role="dialog" aria-labelledby="approveModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">System Message</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            The advert has been approved successfully!
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

    <h3>Advert Approvals</h3>
    <small>Through this page, you can accept or reject the adverts.</small>
    <br><br>
    <div id="loadingDiv">
      <div class="alert alert-info" role="alert">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only"></span>
        </div>
        <small><b>Please wait, data is being fetched..</b></small>
      </div>
    </div>
    <div id="ajaxError" style="display: none" class="alert alert-danger" role="alert">
      <small>An error occurred while processing, please refresh the page.</small>
    </div>

    <span id="noRecordMsg" style="display:none;color:red">We have not any record for approving process!</span>
    <table class="table advertTable" style="display: none;">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Title</th>
          <th scope="col">City</th>
          <th scope="col">Operation</th>
        </tr>
      </thead>
      <tbody>

      </tbody>
    </table>

    <footer class="footer">
      <hr>
      <p>
        &copy; 2020 RealMove - Real Estate Listing Platform
      </p>
      <br>
    </footer>

  </main><!-- /.container -->

  <!-- Bootstrap core JavaScript
    ================================================== -->
  <!-- Placed at the end of the document so the pages load faster -->
  <script src="js/jquery-3.5.1.min.js"></script>
  <script src="js/popper.min.js"></script>
  <script src="js/bootstrap.min.js"></script>
  <script type="text/javascript">
    function approveOrRejectAdvert(operation, advertId) {
      $.ajax({
          url: 'api_calls/call_api.php?operation=approveOrRejectAdvert',
          type: 'POST',
          cache: false,
          dataType: "json",
          data: { operation: operation, advertId: advertId },
          timeout: 10000,
          success: function(response) {
            if (response === "false") {
              $('#ajaxError').show();
              console.log(response);
            } else {
              $('#ajaxError').hide();
              console.log(response);

              if(operation === "approve") {
                $('#approveModal').modal('show');
              }else {
                $('#rejectedModal').modal('show');
              }
              
              // refresh data
              $(".advertTable > tbody").empty();
              getAdverts();
            }
          },
          error: function(response) {
            $('#ajaxError').show();
          },
          
        });
    }

    function getAdverts() {
      $.ajax({
        url: 'api_calls/call_api.php?operation=getAllAdverts',
        type: 'POST',
        cache: false,
        timeout: 10000,
        success: function(response) {
          try {
            var resp = JSON.parse(response);
          }catch {
            $('#loadingDiv').hide();
            $('.advertTable').hide();
            $('#noRecordMsg').show(); 
          }

          if (resp.error != null) {
            $('#ajaxError').show();
          } else {
            $('#ajaxError').hide();
            console.log(resp);

            $.each(resp, function(i, item) {

              console.log(item.title);

              $(".advertTable").find('tbody')
                .append($('<tr>')
                  .append($('<td>').text(i + 1))
                  .append($('<td>').text(item.title.substring(0, 50)))
                  .append($('<td>').text(item.city))
                  .append($('<td>').html(
                    '<button type="button" class="approveBtn btn btn-success btn-sm">Approve</button>\
                      <button type="button" class="rejectBtn btn btn-danger btn-sm">Reject</button>\
                      <input type="hidden" id="advertId" value="' + item.advertId + '">'))
                );
            });
            //show table
            $('.advertTable').fadeIn();

            $('.approveBtn').click(function() {
              var advertId = $(this).parents('tr').find('#advertId').val();

              approveOrRejectAdvert("approve", advertId);
            });

            $('.rejectBtn').click(function() {
              var advertId = $(this).parents('tr').find('#advertId').val();

              approveOrRejectAdvert("reject", advertId);
            });
          }

        },
        error: function(response) {
          $('#ajaxError').show();
        },
      });
    }

    $(document).ready(function() {

      var $loading = $('#loadingDiv').hide();
      $(document)
        .ajaxStart(function() {
          $loading.show();
        })
        .ajaxStop(function() {
          $loading.hide();
        });

      // fetching adverts
      getAdverts();

    });
  </script>
</body>

</html>