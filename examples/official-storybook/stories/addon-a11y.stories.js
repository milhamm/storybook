import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';

import BaseButton from '../components/BaseButton';
import DelayedRender from '../components/DelayedRender';
import Button from '../components/addon-a11y/Button';
import Image from '../components/addon-a11y/Image';
import * as Form from '../components/addon-a11y/Form';
import * as Typography from '../components/addon-a11y/Typography';

const text = 'Testing the a11y addon';
const image = 'http://placehold.it/350x150';
// eslint-disable-next-line no-script-url
const href = 'javascript:void 0';

storiesOf('Addons|a11y', module)
  .addParameters({ options: { selectedAddonPanel: 'storybook/a11y/panel' } })
  .add('Default', () => <BaseButton label="" />)
  .add('Label', () => <BaseButton label={text} />)
  .add('Disabled', () => <BaseButton disabled label={text} />)
  .add('Invalid contrast', () => (
    // FIXME: has no effect on score
    <BaseButton style={{ color: 'black', backgroundColor: 'black' }} label={text} />
  ))
  .add('delayed render', () => (
    <DelayedRender>
      <BaseButton label="This button has a delayed render of 1s" />
    </DelayedRender>
  ));

//

storiesOf('Addons|A11y/Button', module)
  .add('Default', () => <Button />)
  .add('Content', () => <Button content={text} />)
  .add('Label', () => <Button label={text} />)
  .add('Disabled', () => <Button disabled content={text} />)
  .add('Invalid contrast', () => <Button contrast="wrong" content={text} />);

storiesOf('Addons|A11y/Form', module)
  .add('Without Label', () => <Form.Row input={<Form.Input />} />)
  .add('With label', () => (
    <Form.Row label={<Form.Label content={text} id="1" />} input={<Form.Input id="1" />} />
  ))
  .add('With placeholder', () => <Form.Row input={<Form.Input id="1" placeholder={text} />} />);

storiesOf('Addons|A11y/Image', module)
  .add('Without alt', () => <Image src={image} />)
  .add('With alt', () => <Image src={image} alt={text} />)
  .add('Presentation', () => <Image presentation src={image} />);

storiesOf('Addons|A11y/Typography', module)
  .add('Correct', () => (
    <Fragment>
      <Typography.Heading level={1}>{text}</Typography.Heading>
      <Typography.Text>{text}</Typography.Text>
      <Typography.Link content={`${text}...`} href={href} />
    </Fragment>
  ))
  .add('Empty Heading', () => <Typography.Heading level={2} />)
  .add('Empty Paragraph', () => <Typography.Text />)
  .add('Empty Link', () => <Typography.Link href={href} />)
  .add('Link without href', () => <Typography.Link content={`${text}...`} />);
