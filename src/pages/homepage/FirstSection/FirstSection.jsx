import React from 'react';
import ComingSoonComponent from '../../../components/ComingSoon/ComingSoon';

import './FirstSection.scss';

export const FirstSectionComponent = _ => (
	<div className="first-section section">
		<div className="first-section__content">
			{/* <div className="first-section__content__group">

                        <div className="block block--first">

                        </div>
                    </div>
                    <div className="first-section__content__group">
                        <div className="block block--second">

                        </div>
					</div> */}
			<ComingSoonComponent />
		</div>
	</div>
);

export default FirstSectionComponent;
