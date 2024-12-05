import React, { useState, useEffect } from 'react';
import { supabase } from '../../firebase/supabaseClient'; // Import Supabase client
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate and useParams for navigation and edit handling

const ComposePage = () => {
  const [formData, setFormData] = useState({
    bishoyBiboron: '',
    upodeshtarDepto: '',
    seniorSecretaryDepto: '',
    atikSecretaryLaw: '',
    additonalSecretaryLaw: '',
    jnSecretaryLaw: '',
    adhiShakha: '',
    atikSecretaryDiscipline: '',
    anuVibhagDiscipline: '',
    jnSecretaryDiscipline: '',
    adhiShakhaDiscipline: '',
    lawShakha: '',
    disciplineShakha: '',
    lawShakhaNumber: '', 
    disciplineShakhaNumber: '', 
    suparishComment: '',
    diaryNo: '',
    bibid: '',
    internalDepto: '',
    externalDepto: '',
    signatureSeal: ''
  });

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();
  const { id } = useParams(); // Get the ID from the URL (for edit mode)

  // Fetch data if editing an existing entry
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const { data, error } = await supabase
          .from('compose')
          .select('*')
          .eq('id', id)
          .single();
          
        if (data) {
          setFormData(data); // Pre-populate form with the fetched data
        }
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let result;
      if (id) {
        // Update existing record
        const { data, error } = await supabase
          .from('compose')
          .update({
            bishoy_biboron: formData.bishoyBiboron,
            upodeshtar_depto: formData.upodeshtarDepto,
            senior_secretary_depto: formData.seniorSecretaryDepto,
            atik_secretary_law: formData.atikSecretaryLaw,
            anu_vibhag: formData.additonalSecretaryLaw,
            atik_secretary_discipline: formData.atikSecretaryDiscipline,
            anu_vibhag_discipline: formData.anuVibhagDiscipline,
            law_shakha: formData.lawShakha,
            discipline_shakha: formData.disciplineShakha,
            law_shakha_number: formData.lawShakhaNumber ? parseInt(formData.lawShakhaNumber, 10) : null,
            discipline_shakha_number: formData.disciplineShakhaNumber ? parseInt(formData.disciplineShakhaNumber, 10) : null,
            suparish_comment: formData.suparishComment,
            diary_no: formData.diaryNo,
            internal_depto: formData.internalDepto,
            external_depto: formData.externalDepto,
            signature_seal: formData.signatureSeal
          })
          .eq('id', id);

        if (error) {
          setModalMessage(`Error: ${error.message}`);
        } else {
          setModalMessage('Record updated successfully!');
        }
      } else {
        // Create new record
        const { data, error } = await supabase
          .from('compose')
          .insert([
            {
              bishoy_biboron: formData.bishoyBiboron,
              upodeshtar_depto: formData.upodeshtarDepto,
              senior_secretary_depto: formData.seniorSecretaryDepto,
              atik_secretary_law: formData.atikSecretaryLaw,
              anu_vibhag: formData.additonalSecretaryLaw,
              atik_secretary_discipline: formData.atikSecretaryDiscipline,
              anu_vibhag_discipline: formData.anuVibhagDiscipline,
              law_shakha: formData.lawShakha,
              discipline_shakha: formData.disciplineShakha,
              law_shakha_number: formData.lawShakhaNumber ? parseInt(formData.lawShakhaNumber, 10) : null,
              discipline_shakha_number: formData.disciplineShakhaNumber ? parseInt(formData.disciplineShakhaNumber, 10) : null,
              suparish_comment: formData.suparishComment,
              diary_no: formData.diaryNo,
              internal_depto: formData.internalDepto,
              external_depto: formData.externalDepto,
              signature_seal: formData.signatureSeal
            }
          ]);

        if (error) {
          setModalMessage(`Error: ${error.message}`);
        } else {
          setModalMessage('Record added successfully!');
        }
      }

      setShowModal(true);
    } catch (err) {
      setModalMessage('Failed to submit form. Please try again.');
      setShowModal(true);
    }
  };

  const handleDelete = async () => {
    try {
      const { data, error } = await supabase
        .from('compose')
        .delete()
        .eq('id', id);

      if (error) {
        setModalMessage(`Error: ${error.message}`);
      } else {
        setModalMessage('Record deleted successfully!');
        setShowModal(true);
      }
    } catch (err) {
      setModalMessage('Failed to delete record. Please try again.');
      setShowModal(true);
    }
  };

  const handleModalClose = () => {
    if (modalMessage === 'Record updated successfully!' || modalMessage === 'Record added successfully!') {
      navigate('/dashboard'); // Redirect to dashboard after success
    }
    setShowModal(false); // Close the modal
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f4f9' }}>
      <h1 style={{ textAlign: 'center', color: '#333', fontWeight: 'bold', fontSize: '2.5rem' }}>
        {id ? 'Edit ডায়রি' : 'ডায়রি'}
      </h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ marginBottom: '10px' }}>
          <label>বিষয় / বিবরণ:</label>
          <input
            type="text"
            name="bishoyBiboron"
            value={formData.bishoyBiboron}
            onChange={handleChange}

            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
          <div style={{ flex: 1 }}>
            <label>উপদেষ্টার দপ্তর:</label>
            <input
              type="text"
              name="upodeshtarDepto"
              value={formData.upodeshtarDepto}
              onChange={handleChange}

              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <label>সিনিয়র সচিবের দপ্তর:</label>
            <input
              type="text"
              name="seniorSecretaryDepto"
              value={formData.seniorSecretaryDepto}
              onChange={handleChange}

              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
        </div>




        <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
          <div style={{ flex: 1 }}>
            <label>অতিঃ সচিব (আইন) অনুবিভাগ:</label>
            <input
              type="text"
              name="atikSecretaryLaw"
              value={formData.atikSecretaryLaw}
              onChange={handleChange}

              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <label>যুগ্ন সচিব (আইন) অধিশাখা:</label>
            <input
              type="text"
              name="additonalSecretaryLaw"
              value={formData.additonalSecretaryLaw}
              onChange={handleChange}

              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
        </div>


        <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
          <div style={{ flex: 1 }}>
            <label>অতিঃ সচিব (শৃংখলা) অনুবিভাগ:</label>
            <input
              type="text"
              name="atikSecretaryDiscipline"
              value={formData.atikSecretaryDiscipline}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <label>যুগ্ন সচিব (শৃংখলা) অধিশাখা:</label>
            <input
              type="text"
              name="anuVibhagDiscipline"
              value={formData.anuVibhagDiscipline}
              onChange={handleChange}

              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
        </div>



        <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
          {/* <div style={{ flex: 1 }}>
<label>আইন শাখা:</label>
<input
type="text"
name="lawShakha"
value={formData.lawShakha}
onChange={handleChange}

style={{ width: '100%', padding: '8px', marginTop: '5px' }}
/>
</div> */}

          <div style={{ flex: 1 }}>
            <label>আইন শাখা:</label>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input
                type="text"
                name="lawShakha"
                value={formData.lawShakha}
                onChange={handleChange}
                style={{ flex: 2, padding: '8px', marginTop: '5px' }}
              />
              <select
                name="lawShakhaNumber"
                value={formData.lawShakhaNumber || ""}
                onChange={handleChange}
                style={{ flex: 1, padding: '8px', marginTop: '5px' }}
              >
                <option value="" disabled>নির্বাচন</option>
                <option value="1">১</option>
                <option value="2">২</option>
                <option value="3">৩</option>
                <option value="4">৪</option>
              </select>
            </div>
          </div>


          <div style={{ flex: 1 }}>
            <label>শৃংখলা শাখা:</label>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input
                type="text"
                name="disciplineShakha"
                value={formData.disciplineShakha}
                onChange={handleChange}
                style={{ flex: 2, padding: '8px', marginTop: '5px' }}
              />
              <select
                name="disciplineShakhaNumber"
                value={formData.disciplineShakhaNumber || ""}
                onChange={handleChange}
                style={{ flex: 1, padding: '8px', marginTop: '5px' }}
              >
                <option value="" disabled>নির্বাচন</option>
                <option value="1">১</option>
                <option value="2">২</option>
                <option value="3">৩</option>
                <option value="4">৪</option>
              </select>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>সুপারিশ/মন্তব্য:</label>
          <textarea
            name="suparishComment"
            value={formData.suparishComment}
            onChange={handleChange}

            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>ডায়েরি নং:</label>
          <input
            type="text"
            name="diaryNo"
            value={formData.diaryNo}
            onChange={handleChange}

            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        {/* <div style={{ marginBottom: '10px' }}>
  <label>বিবিধ:</label>
  <input
    type="text"
    name="bibid"
    value={formData.bibid}
    onChange={handleChange}
    required
    style={{ width: '100%', padding: '8px', marginTop: '5px' }}
  />
</div> */}

        <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
          <div style={{ flex: 1 }}>
            <label>বিবিধ/অভ্যন্তরীণ দপ্তর:</label>
            <input
              type="text"
              name="internalDepto"
              value={formData.internalDepto}
              onChange={handleChange}

              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <label>বিবিধ/বহিস্থ দপ্তর:</label>
            <input
              type="text"
              name="externalDepto"
              value={formData.externalDepto}
              onChange={handleChange}

              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>স্বাক্ষর/সীল:</label>
          <input
            type="text"
            name="signatureSeal"
            value={formData.signatureSeal}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            width: '100%'
          }}
        >
          {id ? 'Update' : 'Submit'}
        </button>

        {id && (
          <button
            type="button"
            onClick={handleDelete}
            style={{
              padding: '10px 20px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              width: '100%',
              marginTop: '10px'
            }}
          >
            Delete
          </button>
        )}
      </form>

      {/* Modal for success or error */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '5px',
            width: '300px',
            textAlign: 'center'
          }}>
            <p>{modalMessage}</p>
            <button
              onClick={handleModalClose}
              style={{
                padding: '10px 20px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComposePage;
