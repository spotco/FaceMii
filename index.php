<!--
Front page content for thoughtcomet.com

work by Sean Johnstone
-->
<?php
	//Monitors Site Visitation
	$siteData = file("sitedata.txt");
	$visits = explode(":",$siteData[0]);
	$visits[1]++;
	$newFile= implode(":",$visits);
	file_put_contents("sitedata.txt",$newFile);
	
	include("framework.php");

	makeHeader("ThoughtComet");
	
	openingContent("ThoughtComet");
?>
			<!--
			<div id="colboard">
				<div id="leftcol" class="col">
					<h2>What to check out right now.</h2>
					<ul>
						<li>Politics</li>
						<li>Technology</li>
						<li>Film</li>
					</ul>
				</div>
				
				<div id="rightcol" class="col">
					<h2>Feel free to look around...</h2>
				</div>
			</div>
			-->
		</div>
		
<?php
	closeAndExplore();
?>