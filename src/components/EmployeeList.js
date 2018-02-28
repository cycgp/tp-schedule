import React from 'react';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import darkBlack from 'material-ui/styles/colors';

const style = {
	margin: '0 auto',
	width: '90%',
	marginTop: '30px'
};

const EmployeeList = () => (
	<div>
		<Paper style={style} zDepth={1}>
			<List>
				<ListItem
					leftAvatar={<Avatar src="images/ok-128.jpg" />}
					primaryText="Brendan Lim"
					secondaryText={
						<p>
							<span style={{ color: darkBlack }}>
								Brunch this weekend?
							</span>
							<br />
							I&apos;ll be in your neighborhood doing errands this
							weekend. Do you want to grab brunch?
						</p>
					}
					secondaryTextLines={2}
				/>
				<Divider inset={true} />
				<ListItem
					leftAvatar={<Avatar src="images/kolage-128.jpg" />}
					primaryText="me, Scott, Jennifer"
					secondaryText={
						<p>
							<span style={{ color: darkBlack }}>Summer BBQ</span>
							<br />
							Wish I could come, but I&apos;m out of town this
							weekend.
						</p>
					}
					secondaryTextLines={2}
				/>
				<Divider inset={true} />
				<ListItem
					leftAvatar={<Avatar src="images/uxceo-128.jpg" />}
					primaryText="Grace Ng"
					secondaryText={
						<p>
							<span style={{ color: darkBlack }}>Oui oui</span>
							<br />
							Do you have any Paris recs? Have you ever been?
						</p>
					}
					secondaryTextLines={2}
				/>
				<Divider inset={true} />
				<ListItem
					leftAvatar={<Avatar src="images/kerem-128.jpg" />}
					primaryText="Kerem Suer"
					secondaryText={
						<p>
							<span style={{ color: darkBlack }}>
								Birthday gift
							</span>
							<br />
							Do you have any ideas what we can get Heidi for her
							birthday? How about a pony?
						</p>
					}
					secondaryTextLines={2}
				/>
				<Divider inset={true} />
				<ListItem
					leftAvatar={<Avatar src="images/raquelromanp-128.jpg" />}
					primaryText="Raquel Parrado"
					secondaryText={
						<p>
							<span style={{ color: darkBlack }}>
								Recipe to try
							</span>
							<br />
							We should eat this: grated squash. Corn and
							tomatillo tacos.
						</p>
					}
					secondaryTextLines={2}
				/>
			</List>
		</Paper>
	</div>
);

export default EmployeeList;
