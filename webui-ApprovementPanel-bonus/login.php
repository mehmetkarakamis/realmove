<?php
// Start the session
session_start();
?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Signin to RealMove Platform</title>

    <!-- Bootstrap core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="css/signin.css" rel="stylesheet">
  </head>

  <body class="text-center">
    <div id="loginContainer">
        <form class="form-signin">
            <img class="mb-4" src="realmove_logo.png" alt="" width="120" height="120">
            <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
            <label for="inputEmail" class="sr-only">Email address</label>
            <input type="email" autocomplete="off" id="email" class="form-control" placeholder="Email address" required autofocus>
            <label for="inputPassword" autocomplete="off" class="sr-only">Password</label>
            <input type="password" id="password" class="form-control" placeholder="Password" required>

            <button class="btn btn-lg btn-primary btn-block" id="signBtn" type="submit">Sign in</button>
            <br>
            <div id="loadingDiv">
                <div class="spinner-border text-primary" role="status">
                    <span class="sr-only"></span>
                </div>
                <small><b>Please wait, your transaction is in progress..</b></small>
            </div>
            <div id="loginError" style="display: none;" class="alert alert-danger" role="alert">
                <small>Your e-mail address or password was incorrect!</small>
            </div>
            <div id="loginSuccess" style="display: none;" class="alert alert-success" role="alert">
                <small>Login is successful, you are being redirected..</small>
            </div>

            <p class="mt-5 mb-3 text-muted">&copy; 2020-2021</p>
          </form>
    </div>

    <script src="js/jquery-3.5.1.min.js"></script>
    <script type="text/javascript">
        function loginToAPI() {
            var jsonData = {
                email: $('#email').val(),
                password: $('#password').val()
            };

            $.ajax({
                url: 'api_calls/login_api.php?process=true',
                type: 'POST',
                cache: false,
                timeout: 10000,
                data: jsonData,
                success: function (response) {
                    var resp = JSON.parse(response);

                    if(resp.error != null) {
                        $('#loginError').show();
                    }else {
                        $('#loginSuccess').show();

                        window.setTimeout(function(){
                            window.location.href = "index.php";
                        }, 1700);
                    }

                    $('#signBtn').removeAttr('disabled');
                },
                error: function (response) {
                    console.log(response);
                    alert('Error occured: ' + response);
                    $('#signBtn').removeAttr('disabled');
                },
            });
        }

        $(document).ready(function() {

            var $loading = $('#loadingDiv').hide();
            $(document)
                .ajaxStart(function () {
                    $loading.show();
                })
                .ajaxStop(function () {
                    $loading.hide();
                });

            $('#signBtn').click(function(e) {
                $('#loginError').hide();
                $('#loginError').hide();
                e.preventDefault();
                e.stopPropagation();

                $(this).prop('disabled', true);
                // call login operation
                loginToAPI();
            });

        });

    </script>

  </body>
</html>
