function check_value(fieldvalue) {
    switch (fieldvalue) {
      case 1:
        document.getElementById("imagedest").innerHTML = "<img src='/store/images/2a-b.png' height='300px' width='450px'>";
        break;
      case 2:
        document.getElementById("imagedest").innerHTML = "<img src='/store/images/2b-a.png' height='300px' width='450px'>";
        break;
      case 3:
        document.getElementById("imagedest").innerHTML = "<img src='/store/images/2ab.png' height='300px' width='450px'>";
        break;
      case 4:
        document.getElementById("imagedest").innerHTML = "<img src='/store/images/3a-b-c.png' height='400px' width='400px'>";
        break;
      case 5:
        document.getElementById("imagedest").innerHTML = "<img src='/store/images/3a-b.png' height='400px' width='400px'>";
        break;
      case 6:
        document.getElementById("imagedest").innerHTML = "<img src='/store/images/3a-c.png' height='400px' width='400px'>";
        break;
      case 7:
        document.getElementById("imagedest").innerHTML = "<img src='/store/images/3b-a-c.png' height='400px' width='400px'>";
        break;
      case 8:
        document.getElementById("imagedest").innerHTML = "<img src='/store/images/3b-a.png' height='400px' width='400px'>";
        break;
      case 9:
        document.getElementById("imagedest").innerHTML = "<img src='/store/images/3b-c.png' height='400px' width='400px'>";
        break;
      case 10:
        document.getElementById("imagedest").innerHTML = "<img src='/store/images/3c-a-b.png' height='400px' width='400px'>";
        break;
      case 11:
        document.getElementById("imagedest").innerHTML = "<img src='/store/images/3c-a.png' height='400px' width='400px'>";
        break;
      case 12:
        document.getElementById("imagedest").innerHTML = "<img src='/store/images/3c-b.png' height='400px' width='400px'>";
        break;
      case 13:
        document.getElementById("imagedest").innerHTML = "<img src='/store/images/3ab.png' height='400px' width='400px'>";
        break;
      case 14:
        document.getElementById("imagedest").innerHTML = "<img src='/store/images/3bc.png' height='400px' width='400px'>";
        break;
      case 15:
        document.getElementById("imagedest").innerHTML = "<img src='/store/images/3ca.png' height='400px' width='400px'>";
        break;
      case 16:
        document.getElementById("imagedest").innerHTML = "<img src='/store/images/3abc.png' height='400px' width='400px'>";
        break;
    }
  };

$('#MyModal').on('hidden.bs.modal', function () {
  $(this).find('form').trigger('reset');
})