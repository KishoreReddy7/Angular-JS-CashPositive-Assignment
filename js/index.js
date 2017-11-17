(function(){
  var app = angular.module('bApp',[]);    // APP ID
  
  app.controller('bController', ['$http', function($http){  // Controller ID
    
    var bg = this;          // All Variable That Store The Data Including Title, Description, Url's, Posts, Comments Etc.
    bg.title;
    bg.desc;
    bg.id;
    bg.purl;
    bg.curl;
    bg.posts = {};
    bg.comments = {};
    bg.likes = {};
    bg.commentc={};


          // Replace the Below json with the file that has All the POSTS
    $http.get('data.json').success(function(data){      // Main HTTP Request From the given postman URL.
      bg.title = data.name;
      bg.desc = data.description;
      bg.purl = data.requests[6].url;               // URL FOR posts 
      bg.curl = data.requests[4].url;               // URL FOR Comments for respective posts

      $http.get(bg.purl).success(function(vals){
          bg.posts = vals;
          //bg.posts.reverse();                     // Uncomment This To Display Posts in Reverse Order
      });
      $http.get(bg.curl).success(function(vals){
          bg.comments = vals;
          bg.commentc = Array.apply(null,new Array(10)).map(Number.prototype.valueOf,0);
          bg.likes = Array.apply(null,new Array(10)).map(Number.prototype.valueOf,0);
          for(var i=0;i<bg.comments.length;i++){
            bg.commentc[bg.comments[i].postId]+=1;
          }
      });
    });
    

    
    bg.tab = 'pg';            // Tab ID For page View
    bg.tab = 'bg';            // Tab ID For normal View
    
    bg.selectTab = function(setTab){
      bg.tab = setTab;
      //console.log(bg.tab)
    };
    
    bg.isSelected = function(checkTab){
      return bg.tab === checkTab;
    };
    
    bg.post = {};
    bg.addPost = function(){      // Function to Add the New Post.
    
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth();
      var opt = ["January","February","March","April","May","June","July","August","September","October","November","December"];
      var yyyy = today.getFullYear();
      if(dd<10){
          dd='0'+dd;
      } 
      var today = opt[mm]+' '+dd+', '+yyyy;           // Formatting the Date in the Form January 01, 2018
      bg.post.date = today;
      //bg.posts.reverse();
      bg.post.id = bg.posts.length+1;           // Assigning Post Id for New Post
      bg.post.comments = [];                    // Empty Comments
      bg.likes[bg.post.id] = 0;
      bg.posts.push(this.post);
      //bg.posts.reverse();
      bg.tab = bg.post.id-1;
      bg.post ={};
    };
    
    
  }]);
  
  app.controller('cController', function(){       // Function To add Comment for the post
    this.comment = {};  
    this.addComment = function(bg){
      bg.comments.push(this.comment);
      bg.commentc[this.comment.postId]+=1;
      this.comment ={};
    };
  }); 
 
})();