<?php
session_start();

function checkAuthControl() {
    if (!isset($_SESSION['token']) || !isset($_SESSION['userId'])) {
        echo 'Bu sayfaya erişim yetkiniz yoktur! Lütfen önce giriş yapınız!<br>';
        echo '<a href="login.php">Giriş yapmak için tıklayınız.</a>';
        die();
    }
}