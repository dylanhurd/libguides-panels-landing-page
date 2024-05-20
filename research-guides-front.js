// Construct the SubjectIDs object below:

const subjectIDs = {


 };
 
 /* each property in the object should have the following format:
 
 *SubjectSlug*: {title: '*Publicly Displayed Subject Title*', faunicode: '*font awesome icon unicode*', subs: [*'comma','separated','list','of','guide','ids'*]},
 
 SubjectSlug is used only within the script -- just a brief, unique string (of a-z characters).
 Publicly Displayed Subject Title is the label for each panel -- marked up as <h3>.
 Font awesome icon unicode is the unicode for the font awesome icon representing the subject -- appears below the title in the panel (same as you'd use in CSS, minus the beginning slash).
 Comma separated list of guide ids are the numeric ids for each guide you wish to assign to the subject (guides can be assigned to more than one subject).
 
 Example:
 
 const subjectIDs = {
  "AgFood": {"title": "Agriculture & Food", "faunicode": "f06c", "subs": ["96029","19781","19780","19782","19783","19784","19785","19813","19819","19826","19827","19828","19857","19859","19867","193310","193543", "19806"]},
 
  "ArtArch": {"title": "Art & Architecture", "faunicode": "f1ad", "subs": ["96030","19788","19789","19832","19837","198480"]},
 
  "OpenEd": {"title": "Open Education", "faunicode": "f5d1", "subs": ["189610"]}
};
 
 */


function matchSuperSubject(id) {
    let supersubjectsMatched = [];
	for (let key in subjectIDs) {
  		if ( subjectIDs[key].subs.includes(String(id)) ) {
  		    supersubjectsMatched.push(key);			
		}
	}
	return supersubjectsMatched;
}

function checkSubjects(guidesubjects,li_cl_prefix,guidename,url) {
	let supersubjects = [];	
	if(guidesubjects !== undefined){
	  guidesubjects.forEach((subject) => {
	    let supersubjectsArray = matchSuperSubject( subject.id );
	    supersubjectsArray.forEach((supersubject) => { supersubjects.push( supersubject ) });
	  });

	  var dedupe = (supersubjects) => supersubjects.filter((v,i) => supersubjects.indexOf(v) === i);
	  dedupe(supersubjects).forEach((subjectName) => {
	    if(subjectName !== undefined){
	      let ourListo = document.getElementById('listo-' + subjectName);
	      let item = document.createElement('li');
	      item.setAttribute('class', 'list-group-item ' + li_cl_prefix + '-' + subjectName);
	      let link = document.createElement('a');
	      link.setAttribute('href', url);
	      link.textContent = guidename;
	      item.appendChild(link);
	      ourListo.appendChild(item);
	    }
	  });
	
	}
}

function loader() {
  $.getJSON(
		"https://url-of-api-connection.php", // Set the URL of the api-connection.php you uploaded to your webserver
		function(guides) {
		$.each(guides, function( i, guide ) {
  		 	if (guide.friendly_url != null && guide.friendly_url != '') {
  		 	    var url = guide.friendly_url;
  		 	} else {
  		 		var url = guide.url;
  		 	}
  			if (guide.type_id == 2) { //Course Guide
				checkSubjects( guide.subjects,'cg', guide.name, url );
  			} else if (guide.type_id == 3) { //Subject Guide
  				checkSubjects( guide.subjects,'sg', guide.name, url );
  			} else { // All Guides
  				checkSubjects( guide.subjects,'all', guide.name, url );
  			}
  		});
  		$('#custom-all-btn').addClass('active');
  });
		$('.courseGuides').click(function() {
				let courseID = $(this).attr('id');
				let courseVal = courseID.substr(courseID.indexOf("-") + 1);
				$('#listo-' + courseVal + ' .noclassguides').hide();
				$('#listo-' + courseVal + ' .nosubjectguides').hide();
				$('#cg-' + courseVal).addClass('active');
				$('#cg-' + courseVal).attr('aria-selected', 'true');
				$('#sg-' + courseVal).removeClass('active');
				$('#sg-' + courseVal).attr('aria-selected', 'false');
				$('#all-' + courseVal).removeClass('active');
				$('#all-' + courseVal).attr('aria-selected', 'false');
				$('.cg-' + courseVal).show();
				$('.sg-' + courseVal).hide();
				$('.all-' + courseVal).hide();

				let classGuides = $('.cg-' + courseVal);
				if (classGuides.length < 1) {
					$('#listo-' + courseVal + ' .noclassguides').show();
				};
			});

			$('.subjectGuides').click(function() {
				let subjectID = $(this).attr('id');
				let subjectVal = subjectID.substr(subjectID.indexOf("-") + 1);
				$('#listo-' + subjectVal + ' .noclassguides').hide();
				$('#listo-' + subjectVal + ' .nosubjectguides').hide();
				$('#sg-' + subjectVal).addClass('active');
				$('#sg-' + subjectVal).attr('aria-selected', 'true');
				$('#cg-' + subjectVal).removeClass('active');
				$('#cg-' + subjectVal).attr('aria-selected', 'false');
				$('#all-' + subjectVal).removeClass('active');
				$('#all-' + subjectVal).attr('aria-selected', 'false');
				$('.cg-' + subjectVal).hide();
				$('.sg-' + subjectVal).show();
				$('.all-' + subjectVal).hide();

				let subjectGuides = $('.sg-' + subjectVal);
				if (subjectGuides.length < 1) {
					$('#listo-' + subjectVal + ' .nosubjectguides').show();
				};
			});

			$('.bothGuides').click(function() {
				let bothID = $(this).attr('id');
				let bothVal = bothID.substr(bothID.indexOf("-") + 1);
				$('#listo-' + bothVal + ' .noclassguides').hide();
				$('#listo-' + bothVal + ' .nosubjectguides').hide();
				$('#sg-' + bothVal).removeClass('active');
				$('#sg-' + bothVal).attr('aria-selected', 'false');
				$('#cg-' + bothVal).removeClass('active');
				$('#cg-' + bothVal).attr('aria-selected', 'false');
				$('#all-' + bothVal).addClass('active');
				$('#all-' + bothVal).attr('aria-selected', 'true');
				$('.cg-' + bothVal).show();
				$('.sg-' + bothVal).show();
				$('.all-' + bothVal).show();
			});

			$('.s-lg-index-nav-btn').click(function() {
				$('.s-lg-index-nav-btn').removeClass('active');
				$(this).addClass('active');
				$('#s-lg-hp-nav.loading').removeClass('loading');
			});

			$('.s-lg-index-nav-btn:not(#custom-all-btn)').click(function() {
				$('#system-content').show();
				$('#custom-content').hide();
			});

			$('#custom-all-btn').click(function() {
				$('#system-content').hide();
				$('#custom-content').show();
			});
};

$( document ).ready(function() {
  if(document.getElementById('custom-content') !== null && document.getElementById('custom-content') !== undefined) {
    const containerDiv = document.getElementById('custom-content');
    const style = document.createElement('style');
    style.setAttribute('type', 'text/css');
   
    for (let key in subjectIDs) {
      let subjectFrame = document.createElement('div');
      let html = '<div>';
      html += '<h3 aria-expanded="false" aria-controls="' + key + '" class="collapser">' + subjectIDs[key].title + ' <i class="fa-' + key + '" aria-hidden="true"></i></h3>';
      html += '<div id="' + key + '" class="accordian-panel"><div class="subclassToggle" role="tablist">';
      html += '<button class="bothGuides active" id="all-' + key + '" role="tab" aria-selected="true">All Guides</button><button class="courseGuides" id="cg-' + key + '" role="tab">Course Guides</button><button class="subjectGuides" id="sg-' + key + '" role="tab">Subject Guides</button>';
      html += '</div>';
      html += '<ul class="list-group" id="listo-' + key + '"><li class="list-group-item noclassguides">There are no published course guides for this subject</li><li class="list-group-item nosubjectguides">There are no published subject guides for this subject</li></ul>';
      html += '</div></div>';
      subjectFrame.innerHTML =  html;
      containerDiv.appendChild(subjectFrame);
      containerDiv.appendChild(subjectFrame);
      style.textContent += '.fa-' + key + ':before { content: "\\' + subjectIDs[key].faunicode + '"; }\r\n';
    }
    document.getElementsByTagName('head')[0].appendChild(style);

    loader();

    $('#custom-content').find('.collapser').on('click', function(){
		$(this).toggleClass('in');
		$(this).next('.accordian-panel').toggleClass('in');
		$(this).attr('aria-expanded', (_, attr) => attr == 'false' ? 'true' : 'false');
    })
  } else {
    console.log('no #custom-content div');
  }
});
