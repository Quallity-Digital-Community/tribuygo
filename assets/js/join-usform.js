


$("#enquiry143").click(function(){

var csrfid = $('#csrf_ajax').val();


$.confirm({
    boxWidth: '35%',
    useBootstrap: false,
    title: 'Need a help?!',
    content: '' +
    `<form action="" class="formName">
    
    
      <label for="validationServer03">Name</label>
      <input type="text" name = "ename" class="ename form-control" id="validationServer03" placeholder="Full Name..." required>
      

 
      <label for="validationServer04">MobileNumber</label>
      <input type="text" name = "emobile" class="emobile form-control" id="validationServer04" placeholder="Please enter mobile number!" required>
     
      <label for="validationServer05">Email Address</label>
      <input type="text" name = "eemail" class="eemail form-control" id="validationServer05" placeholder="Please enter email!" required>
      

      <label for="validationServer05">Subject</label>
      <input type="text" name = "esubject" class="esubject form-control" id="validationServer05" placeholder="Please enter subject!" required>
      
   
      <label for="validationServer06">Discription</label>
      <textarea name = "ediscription"class="ediscription form-control" id="validationServer06" placeholder="Please enter discription!" required></textarea>

      
      
  </div>
    
    

    </form>`,
    buttons: {
        formSubmit: {
            text: 'Submit',
            btnClass: 'btn-blue',
            action: function () {
                var name = this.$content.find('.ename');
                var mobile = this.$content.find('.emobile');
                var email = this.$content.find('.eemail');
                var subject = this.$content.find('.esubject');
                var message = this.$content.find('.ediscription');


                const errors = [];


                if(!name.val()){

                    $(name).addClass('is-invalid');

                    errors.push('ename');
                    //return false;
                } else {

                    $(name).removeClass('is-invalid');
                }


                if(!mobile.val() || mobile.val().length < 8 ){

                    $(mobile).addClass('is-invalid');
                    
                    errors.push('emobile');

                    //return false;
                } else {

                     $(mobile).removeClass('is-invalid');
                }


if(!email.val() || !validateEmail(email.val())){

                    $(email).addClass('is-invalid');
                    errors.push('eemail');

                    //return false;
                } else {

                    $(email).removeClass('is-invalid');
                }


if(!subject.val() || subject.val().length < 1){

                    $(subject).addClass('is-invalid');
                   errors.push('esubject');

                    //return false;
                }else {

                     $(subject).removeClass('is-invalid');
                }


if(!message.val() || message.val().length < 2){

                    $(message).addClass('is-invalid');
                     errors.push('emessage');
                    

                    //return false;
                } else  {

                     $(message).removeClass('is-invalid');
                }

                // check error length 
                if( errors.length > 0) {

                  return false;
                }

               

                // Compose the object to send 
                var data = { 
                                csrf_test_name:csrfid,
                                name: name.val(),
                                mobile: mobile.val(),
                                email: email.val(),
                                subject: subject.val(),
                                message: message.val()
                            }



                // Check rest of element 
//fmobile,femail, fsubject, fdiscription
                 $( "#model7878" ).trigger( "click" );
                
                // Send the ajax request 
                $.ajax({
                  type: 'POST',
                  url: ORIGIN+"/api/enquiry_request",
                  data: data,
                  dataType: "json",
                  success: function(resultData) { 

                    console.log(resultData);
                    const csrfhash = resultData.csrf.hash;

                        $('#csrf_ajax').val(csrfhash);

                        console.log(resultData);
                        // Check response data . success is trye  
                        if(resultData.success == '1') {

                            $.alert('Thank you for your message we will get back to you shortly.');

                        } else {

                            $.alert('Unable to send the quest due to following error'+resultData.error);
                        }
                        
                        

                    },
                  complete: function(){
                  
                    $('#close123').trigger('click');
                    $('.modal-backdrop').css('display', 'none');

               },
                });
                
            }
        },
        cancel: function () {
            //close
        },
    },
    onContentReady: function () {
        // bind to events
        var jc = this;
        this.$content.find('form').on('submit', function (e) {
            // if the user submits the form by pressing enter in the field.
            e.preventDefault();
            jc.$$formSubmit.trigger('click'); // reference the button and click it
        });
    }
});

});





$("#join-us").click(function(){

var csrfid = $('#csrf_ajax').val();


$.confirm({
    boxWidth: '35%',
    useBootstrap: false,
    title: 'Join Us',
    content: '' +
    `<form action="" class="formName">
      
       <br/>
      <br/>
      
        <input type = "radio"  id = "validationServer07"  name = "contact-type" class = "jcontact-type" value = "add_web_website" checked/>
      


      <label for="validationServer07">Add My Website/Products</label>

&nbsp; &nbsp;

     
      <input type = "radio"  id = "validationServer08" name = "contact-type" class = "jcontact-type" value = "pleace_advertisement"/>


      <label for="validationServer08">Place Advertisement</label>

      
      </div>

      <br/>
      <br/>
    
      <label for="validationServer03">Name</label>
      <input type="text" name = "jname" class="jname form-control" id="validationServer03" placeholder="Full Name..." required>
      

 
      <label for="validationServer04">MobileNumber</label>
      <input type="text" name = "jmobile" class="jmobile form-control" id="validationServer04" placeholder="Please enter mobile number!" required>
     
      <label for="validationServer05">Email Address</label>
      <input type="text" name = "jemail" class="jemail form-control" id="validationServer05" placeholder="Please enter email!" required>
      
      <label for="validationServer05">Website</label>
      <input type="text" name = "jwebsite" class="jwebsite form-control" id="validationServer05" placeholder="Please enter email!" required>
      
   
      <label for="validationServer06">Discription</label>
      <textarea name = "jdiscription"class="jdiscription form-control " id="validationServer06" placeholder="Please enter discription!" required></textarea>

      


      <br/>
      <br/>
     

      


      
  </div>
    
    

    </form>`,
    buttons: {
        formSubmit: {
            text: 'Submit',
            btnClass: 'btn-blue',
            action: function () {

              // Variable that required 
              // jname, jemail, jwebsite, jdiscription, jcontact-type


              const errors = [];
              
                var name = this.$content.find('.jname');
                var email = this.$content.find('.jemail');
                var mobile = this.$content.find('.jmobile');
                var website = this.$content.find('.jwebsite');
                var discription = this.$content.find('.jdiscription');
                var contact_type = this.$content.find('.jcontact-type');



     


                

                
                if(!name.val()){

                    $(name).addClass('is-invalid');

                    errors.push('fname');
                    //return false;
                } else {

                    $(name).removeClass('is-invalid');
                }


                  if(!mobile.val()){

                    $(mobile).addClass('is-invalid');

                    errors.push('fmobile');
                    //return false;
                } else {

                    $(mobile).removeClass('is-invalid');
                }





                if(!email.val()){

                    $(email).addClass('is-invalid');

                    errors.push('femail');
                    //return false;
                } else {

                    $(email).removeClass('is-invalid');
                }


                if(!discription.val()){

                    $(discription).addClass('is-invalid');

                    errors.push('fdiscription');
                    //return false;
                } else {

                    $(discription).removeClass('is-invalid');
                }


              

                 if($("input[name='contact-type'").is(':checked')) { 

                   $("#content-type23").css('color', 'inherit');

                   } else {

                     $("#content-type23").css('color', '#dc3545');

                      return false;
                   }

                   
                   // Compose the data 


                     var data = { 
                                csrf_test_name:csrfid,
                                name: name.val(),
                                mobile: mobile.val(),
                                email: email.val(),
                                website: website.val(),
                                message: discription.val(),
                                contact_type: contact_type.val()
                            }



                // Check rest of element 
//fmobile,femail, fsubject, fdiscription
            
                $( "#model7878" ).trigger( "click" );


                // Send the ajax request 
                $.ajax({
                  type: 'POST',
                  url: ORIGIN+"/api/joinus_request",
                  data: data,
                  dataType: "json",
                  success: function(resultData) { 

                    const csrfhash = resultData.csrf.hash;

                      $('#csrf_ajax').val(csrfhash);

                      
                      console.log(resultData);
                        // Check response data . success is trye  
                        if(resultData.success == '1') {

                            $.alert('Thank you for your message we will get back to you shortly.');

                        } else {

                            $.alert('Unable to send the quest due to following error'+resultData.error);
                        }

                    },
                  complete: function(){
                  
                    $('#close123').trigger('click');
                    $('.modal-backdrop').css('display', 'none');
               },
                });
                
            }
        },
        cancel: function () {
            //close
        },
    },
    onContentReady: function () {
        // bind to events
        var jc = this;
        this.$content.find('form').on('submit', function (e) {
            // if the user submits the form by pressing enter in the field.
            e.preventDefault();
            jc.$$formSubmit.trigger('click'); // reference the button and click it
        });
    }
});

});









function validateEmail($email) {
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailReg.test( $email );
}

