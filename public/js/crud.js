$(function() {
	$('#btnGet').on('click', function(e) {
		e.preventDefault();
		$.ajax({
			url: '/persons',
			method: 'GET',
			contentType: 'application/json',
			success: function(response) {
					//clears the <ul> before filling it again with new data
					$('#responseList').empty();
					
					//prepares the data to be added to the <ul>
					var jsonResponse=JSON.stringify(response);
					$(jQuery.parseJSON(jsonResponse)).each(function() {  
					var name = this.name;
					var lastname = this.lastname;
					var fullname = this.name + ' ' + this.lastname;
					
					//appends the data to the list
					$('#responseList').append(
					'<li>'+fullname+'</li');
				});				
			}
		})
	});	
});	

$(function() {
	$('#btnPost').on('click', function(e) {
		e.preventDefault();
		var name = $('#nameInput').val();
		var lastname = $('#lastNameInput').val();
		var data = JSON.stringify({ name: name, lastname: lastname });
		
		$.ajax({
			url: '/persons',
			method: 'POST',
			contentType: 'application/json',
			data: data,
			success: function(response) {
				console.log(response);
				$('#nameInput').val('');
				$('#lastNameInput').val('');
			}
		})
	});
});

