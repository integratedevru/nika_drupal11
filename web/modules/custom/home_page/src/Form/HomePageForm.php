<?php

namespace Drupal\home_page\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\State\StateInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\file\Entity\File;

/**
 * Provides a Home Page content management form.
 */
class HomePageForm extends FormBase {

  /**
   * The state service.
   *
   * @var \Drupal\Core\State\StateInterface
   */
  protected $state;

  /**
   * Constructs a HomePageForm object.
   *
   * @param \Drupal\Core\State\StateInterface $state
   *   The state service.
   */
  public function __construct(StateInterface $state) {
    $this->state = $state;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('state')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'home_page_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    // Get values from state.
    $title = $this->state->get('home_page.title', '');
    $banner_description = $this->state->get('home_page.banner_description', '');
    $description_value = $this->state->get('home_page.description.value', '');
    $description_format = $this->state->get('home_page.description.format', 'full_html');
    $media_fid = $this->state->get('home_page.media_fid', NULL);
    $image_fid = $this->state->get('home_page.image_fid', NULL);

    // Title field.
    $form['title'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Banner Title'),
      '#description' => $this->t('Enter a title for the banner.'),
      '#default_value' => $title,
      '#required' => TRUE,
    ];

    // Banner Description field.
    $form['banner_description'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Banner Description'),
      '#description' => $this->t('Enter a short description for the banner.'),
      '#default_value' => $banner_description,
      '#rows' => 3,
    ];

    // Description field as WYSIWYG.
    $form['description'] = [
      '#type' => 'text_format',
      '#title' => $this->t('Under Banner Description'),
      '#description' => $this->t('Enter the main page description with formatting.'),
      '#default_value' => $description_value,
      '#format' => $description_format,
      '#rows' => 10,
    ];

    // Image file field.
    $form['image_file'] = [
      '#type' => 'managed_file',
      '#title' => $this->t('Under Banner Image'),
      '#description' => $this->t('Upload an image for the under banner section (jpg, png, gif).'),
      '#upload_location' => 'public://',
      '#upload_validators' => [
        'file_validate_extensions' => ['jpg jpeg png gif'],
        'file_validate_is_image' => [],
      ],
      '#default_value' => $image_fid ? [$image_fid] : NULL,
      '#required' => FALSE,
    ];

    // Submit button.
    $form['actions'] = [
      '#type' => 'actions',
    ];
    $form['actions']['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Save'),
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    // Save values to state.
    $this->state->set('home_page.title', $form_state->getValue('title'));
    $this->state->set('home_page.banner_description', $form_state->getValue('banner_description'));
    
    // Handle description with format.
    $description = $form_state->getValue('description');
    $this->state->set('home_page.description.value', $description['value']);
    $this->state->set('home_page.description.format', $description['format']);
    
    // Handle image file.
    $image_file = $form_state->getValue('image_file');
    if (!empty($image_file[0])) {
      $file = File::load($image_file[0]);
      if ($file) {
        $file->setPermanent();
        $file->save();
        $this->state->set('home_page.image_fid', $file->id());
      }
    }

    $this->messenger()->addStatus($this->t('The Home Page content has been saved.'));
  }
} 