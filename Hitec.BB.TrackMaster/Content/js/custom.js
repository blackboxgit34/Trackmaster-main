
        $(document).ready(function () {
            $(".form_toggle").click(function () {
                $("#login_form").hide();
                $("#pass_form").show();
            });
            $("#btnRequest").click(function () {
                submitDemoRequest();
            });

            var MyUrl = '/Login/BannerData';

            $.ajax({
                url: MyUrl,
                data: { ID: 11 },
                success: function (data) {
                    debugger;
                    if (data == "No msg") {
                        $("#test").css("display", "none");
                        $("#test").html("");
                    }
                    else {
                        $("#test").css("display", "block");
                        $("#test").html(data);
                    }
                }
            });
        });

        function submitDemoRequest() {
            var url = '/login/CameraDemo';
            var name = $("#name").val();
            var email = $("#email").val();
            var phone = $("#phone").val();
            if (name == '') {
                alert('Please enter Name');
                return;
            }
            if (email == '') {
                alert('Please enter Email');
                return;
            }
            else {
                if (!validateEmail(email)) {
                    alert('Invalid email');
                    return;
                }
            }
            if (phone == '') {
                alert('Please enter Phone');
                return;
            }
            var dataToSend = JSON.stringify({ name: name, email: email, phone: phone });

            $.ajax({
                beforeSend: function (xhrObj) {
                    xhrObj.setRequestHeader("Content-Type", "application/json");
                    xhrObj.setRequestHeader("Accept", "application/json");
                },
                type: "POST",
                url: url,
                data: dataToSend,
                dataType: "json",
                async: false,
                success: function (data) {
                    onSuccess(data);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    onError(XMLHttpRequest, textStatus, errorThrown);
                }
            });
        }

        function onSuccess(data) {
            alert(data);
            alert('Thank you for contacting us. We will get back to you soon!');
        }

        function onError(XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest);
            alert(textStatus);
            alert(errorThrown);
        }

        // Function that validates email address through a regular expression.
        function validateEmail(sEmail) {
            var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
            if (filter.test(sEmail)) {
                return true;
            }
            else {
                return false;
            }
        }
